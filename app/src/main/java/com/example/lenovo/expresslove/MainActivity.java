package com.example.lenovo.expresslove;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import android.os.Handler;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.view.WindowManager;
import android.webkit.WebViewClient;

import com.tencent.smtt.sdk.WebView;


public class MainActivity extends AppCompatActivity {




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ActionBar actionBar=getSupportActionBar();//后面几行都用于隐藏标题栏
        if(actionBar !=null)
        {
            actionBar.hide();
        }
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getSupportActionBar().hide();
        new Handler().postDelayed(new Runnable(){ // 为了减少代码使用匿名Handler创建一个延时的调用
            public void run() {
                Intent i = new Intent(MainActivity.this,Main2Activity.class);
                MainActivity.this.startActivity(i);
                MainActivity.this.finish();
            } }, 1500);
    }


        }




