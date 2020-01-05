package main;

public class Task {
    public Task(String task, int id) {
        this.task = task;
        this.id = id;
    }

    private String task;
    private int id;
    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
