# 轻松搞定表白女朋友APP
# Express Love to your Girl Friend

## 1.背景(Backgroud):
在我们平时生活当中，经常会看到一些表白女朋友的html网页，但是Android端的表白软件可以说是基本没有，笔者在全网搜了一下，就没有一个可以用的。安卓端可以给人一种定制和精美的感觉，这是网页所做不到的，网页链接不见了就没了。因此在这里将自己写的Android软件制作流程以及代码全部开源，这里采用了web与安卓原生混合开发的技术，引入了腾讯X5内核替换WebView，可以让软件加载速度提高百分之三十。在Github里，我也导入了了几款不同的背景动态模板，可以供你们进行挑选，也导入了不同的背景音乐可供选择，具体的更换方法也会在下面的博客当中详细解释的（如果不想自己敲代码的话），麻烦在Github给颗星，小弟将不胜感激！不会打包生成安装包apk的,可以直接安装的apk文件我也直接上传到github上了！零基础也可以玩儿！：Github唯一指定链接：
https://github.com/Geeksongs/ExpressLove

实现过程介绍：
https://www.cnblogs.com/geeksongs/p/10723048.html


An Android software used to express love to his girlfriend, currently there are fewer love software based on the Android platform on the Internet, so I open source of it. It mainly integrates Tencent X5 kernel, web and Android native mixed development. Software background dynamics can be changed at any time, supporting high customization and secondary development. Welcome all technical colleagues to download.

## 2.软件的效果如下(Demo Video):

![image](https://github.com/Geeksongs/ExpressLove/blob/master/yanshi.gif)


## 3.更换表白背景的方法:

刚才的第一个动图的背景是以文件index.html为背景的APP,这里还给出了两套背景，大家可以根据自己的喜好进行更换，第一/二/三套背景分别位于assets文件夹下，如下图所示:

![image](https://github.com/Geeksongs/ExpressLove/blob/master/file.png)

第二套背景的名称为index2.html，效果如下所示：

![image](https://github.com/Geeksongs/ExpressLove/blob/master/2.gif)

我们可以在Main3Activity.java处对想要显示的背景进行更改，Main3Activity.java的代码如下

```java

public class Main3Activity extends AppCompatActivity {
    private WebView webView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main3);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getSupportActionBar().hide();
        //匿名内部启动新线程
        new Handler().postDelayed(new Runnable(){ 
            public void run() {
                String url="weixin://";
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
            } }, 40000);//原来是5000
        webView = (WebView) findViewById(R.id.webView2);
        //需要加载的网页的url
        webView.loadUrl("file:///android_asset/index2.html");
        //这里写的是assets文件夹下html文件的名称，需要带上后面的后缀名，前面的路径是安卓系统自己规定的android_asset就是表示的在assets文件夹下的意思。
    }
}
```
我们只需要将最后一行代码 webView.loadUrl("file:///android_asset/index.html")当中的index.html更改为index2.html就可以换成第二套背景了，换其他背景的方法也是同样的方法。
当然你也可以根据自己的想法对我的APP做出相应的调整，非常欢迎pull request,如果pull request了，将会得到神秘奖励哟！
