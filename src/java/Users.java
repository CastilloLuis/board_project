
import java.util.HashMap;
import javax.websocket.Session;

public class Users {

    private static HashMap users_list = new HashMap();

    public static void addUser(Session session, String username) {
        users_list.put(session.getId(),username);
    }
    
    public static HashMap usersList(){
        return users_list;
    }
    
    public static void removeUser(Session user){
        users_list.remove(user.getId());
    }
}
