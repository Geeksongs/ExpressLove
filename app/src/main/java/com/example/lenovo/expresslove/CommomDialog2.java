package com.example.lenovo.expresslove;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;

public class CommomDialog2 extends Dialog implements View.OnClickListener {
    private TextView contentTxt;
    private TextView titleTxt;

    private TextView cancelTxt;

    private Context mContext;
    private String content;
    private CommomDialog.OnCloseListener listener;
    private String positiveName;
    private String negativeName;
    private String title;

    public CommomDialog2(Context context) {
        super(context);
        this.mContext = context;
    }

    public CommomDialog2(Context context, int themeResId, String content) {
        super(context, themeResId);
        this.mContext = context;
        this.content = content;
    }

    public CommomDialog2(Context context, int themeResId, String content, CommomDialog.OnCloseListener listener) {
        super(context, themeResId);
        this.mContext = context;
        this.content = content;
        this.listener = listener;
    }

    protected CommomDialog2(Context context, boolean cancelable, OnCancelListener cancelListener) {
        super(context, cancelable, cancelListener);
        this.mContext = context;
    }

    public CommomDialog2 setTitle(String title){
        this.title = title;
        return this;
    }

    public CommomDialog2 setPositiveButton(String name){
        this.positiveName = name;
        return this;
    }

    public CommomDialog2 setNegativeButton(String name){
        this.negativeName = name;
        return this;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_unique);
        setCanceledOnTouchOutside(false);
        initView();
    }

    private void initView(){
        contentTxt = (TextView)findViewById(R.id.content2);
        titleTxt = (TextView)findViewById(R.id.title2);

        cancelTxt = (TextView)findViewById(R.id.cancel2);
        cancelTxt.setOnClickListener(this);

        contentTxt.setText(content);


        if(!TextUtils.isEmpty(negativeName)){
            cancelTxt.setText(negativeName);
        }

        if(!TextUtils.isEmpty(title)){
            titleTxt.setText(title);
        }

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.cancel2:
                if(listener != null){
                    listener.onClick(this, false);
                }
                this.dismiss();
                break;

        }
    }

    public interface OnCloseListener{
        void onClick(Dialog dialog, boolean confirm);
    }
}
