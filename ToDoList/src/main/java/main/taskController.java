package main;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class taskController {


    @GetMapping(value = "/tasks/")
    public static List<Task> list(){
        return Database.database;
    }


    @PostMapping(value = "/tasks/")
    public static int add(String task) {
        int id = Database.lastID++;
        Database.database.add(new Task(task,id));
        return id;
    }

    @DeleteMapping(value = "/tasks/{id}")
    public static ResponseEntity delete(@PathVariable int id) {
        for(Task task : Database.database) {
            if(task.getId() == id) {
                Database.database.remove(task);
                break;
            }
        }
        return new ResponseEntity(id, HttpStatus.OK);
    }

    @PatchMapping(value = "/tasks/{id}")
    public static ResponseEntity update(@PathVariable int id, String value) {
        for(Task task : Database.database) {
            if(task.getId() == id) {
                task.setTask(value);
                break;
            }
        }
        return new ResponseEntity(id, HttpStatus.OK);
    }


}
