
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONObject;

@ServerEndpoint("/chatsv/{username}")
public class ChatSv {

    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());

    @OnOpen
    public void onOpen(@PathParam("username") String username, Session session) throws IOException, EncodeException {
        clients.add(session);
        Users.addUser(session, username);
        System.out.println("LISTA DE USUARIOS: " + Users.usersList());
        connectedUser(true, session);
    }

    @OnMessage
    public void onMessage(String msg, Session session)
            throws IOException {
        synchronized (clients) {
            for (Session client : clients) {
                client.getBasicRemote().sendText(msg);
            }
        }
    }

    public void connectedUser(boolean connected, Session session) throws IOException, EncodeException {
        HashMap list = Users.usersList();
        JSONObject myjson = new JSONObject(list);
        myjson.put("popup", true).put("isjson", true).put("hasconnected", connected).put("username", Users.usersList().get(session.getId()));
        synchronized (clients) {
            for (Session client : clients) {
                client.getBasicRemote().sendText(myjson.toString());
            }
        }
    }

    //CLOSE AND ERROR METHODS//
    @OnClose
    public void onClose(Session session) throws IOException, EncodeException {
        System.out.println("se had desconectado: " + Users.usersList().get(session.getId()));
        String username = (String) Users.usersList().get(session.getId());

        clients.remove(session); // remove the client from the SessionHashMap
        Users.removeUser(session); // remove the client from the hashmap users
        JSONObject myjson = new JSONObject(Users.usersList());
        myjson.put("popup", true).put("isjson", true).put("hasconnected", false).put("username", username);

        System.out.println(myjson);
        synchronized (clients) {
            for (Session client : clients) {
                client.getBasicRemote().sendText(myjson.toString());
            }
        }
    }

    @OnError
    public void onError(Throwable e) throws IOException {
        JSONObject json = new JSONObject();
        json.put("status", 500).put("msg", e.getMessage());
        synchronized (clients) {
            for (Session client : clients) {
                client.getBasicRemote().sendText(json.toString());
            }
        }
    }

}
