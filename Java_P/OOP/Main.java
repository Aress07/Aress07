interface MusicPlayer {
    void play();
    void pause();
    void stop();
    void next();
}

abstract class AbstractMusicPlayer implements MusicPlayer {
    protected String[] songs;
    protected int idx;
    protected boolean on;

    public AbstractMusicPlayer(String[] songs) {
        this.songs = songs;
        this.idx = 0;
        this.on = false;
    }
    @Override
    public void next() {
        idx = (idx + 1) % songs.length;
        System.out.println("Now song is: " + songs[idx]);
    }
}

class SimpleMusicPlayer extends AbstractMusicPlayer {
    public SimpleMusicPlayer(String[] songs) {
        super(songs);
    }

    @Override
    public void play() {
        if (!on) {
            on = true;
            System.out.println("Start play: " + songs[idx]);
        } else {
            System.out.println("Already playing lol: " + songs[idx]);
        }
    }
    @Override
    public void pause() {
        if (on) {
            on = false;
            System.out.println("paused: " + songs[idx]);
        } else {
            System.out.println("It's not playing so can't pause");
        }
    }
    @Override
    public void stop() {
        if (on) {
            on = false;
            System.out.println("stopped it now");
        } else {
            System.out.println("It's already stopped");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        String[] mySongs = {"music1", "music2", "music3"};
        MusicPlayer mp = new SimpleMusicPlayer(mySongs);

        mp.play();
        mp.next();
        mp.play();
        mp.pause();
        mp.stop();
        mp.next();
        mp.play();
    }
}

