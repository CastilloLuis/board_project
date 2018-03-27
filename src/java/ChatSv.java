
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONObject;

@ServerEndpoint("/chatsv")
public class ChatSv {

    private static Set<Session> clients
            = Collections.synchronizedSet(new HashSet<Session>());

    @OnMessage
    public void onMessage(String msg, Session session)
            throws IOException {
        synchronized (clients) {
            for (Session client : clients) {
                client.getBasicRemote().sendText(msg);
                System.out.println(msg);
            }
        }
    }

    @OnOpen
    public void onOpen(Session session) throws IOException {
        clients.add(session);
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        clients.remove(session);
        JSONObject json = new JSONObject();
        json.put("status", 200).put("msg", "Alguien abandono la sala");
        synchronized (clients) {
            for (Session client : clients) {
                client.getBasicRemote().sendText(json.toString());
            }
        }

    }

    @OnError
    public void onError(Throwable e) throws IOException {
        e.printStackTrace();
        JSONObject json = new JSONObject();
        json.put("status", 500).put("msg", e.getStackTrace());
        synchronized (clients) {
            for (Session client : clients) {
                client.getBasicRemote().sendText(json.toString());
            }
        }
    }
}
