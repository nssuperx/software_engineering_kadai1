//価格設定
var adult_price = 2000;
var univ_stu_price = 1500;
var high_stu_price = 1000;
var elem_stu_price = 500;
var infant_price = 0;
var over60_price = 1000;
var per_disability_price = 800;

//価格設定　このへん辞書とか使ってきれいに書きたい
var price = [2000,1500,1000,500,0,1000,800];
var priceType = ["大人","大学生","高校生","小学生","乳幼児","60歳以上","身障者"];


//割引率
var discount_rate_kenmin = 0.2;
var discount_rate_group = 0.1;

window.onload = function(){
    var priceElements = document.getElementsByClassName("price");
    for(var i=0; i<price.length; i++){
        priceElements[i].innerHTML = price[i].toString() + "円";
    }
    document.getElementById("group").innerHTML = "団体割引適用なし";
}

//計算
function calc() {
    var tableElements = document.getElementsByClassName("calctable");
    var num = new Array(tableElements.length);
    var kenmin_num = new Array(tableElements.length);
    var normal_num = new Array(tableElements.length);
    var subtotal = new Array(tableElements.length);

    console.log(tableElements[0].td);

    for(var i=0; i<tableElements.length; i++){
        //少数を入力されたとき、負の数を入力されたとき、県民の数がもとの人数より多いとき対策
        num[i] = Math.max(parseInt(tableElements[i].getElementsByClassName('number')[0].value), 0);
        kenmin_num[i] = Math.min(Math.max(parseInt(tableElements[i].getElementsByClassName('kenmin')[0].value), 0), num[i]);
        normal_num[i] = num[i] - kenmin_num[i];
        //小計
        subtotal[i] = normal_num[i] * price[i] + kenmin_num[i] * (price[i] * (1 - discount_rate_kenmin));
    }

    //合計を計算
    var totalprice = 0;
    for(st of subtotal){
        totalprice += st;
    }

    

    //総人数を計算
    var totalnum = 0;
    for(n of num){
        totalnum += n;
    }

    //10人以上だったら
    if (num.reduce(function(total, data){return total + data}) >= 10) {
        totalprice = totalprice * (1 - discount_rate_group);
        for(var i=0; i<tableElements.length; i++){
            subtotal[i] = subtotal[i] * (1 - discount_rate_group);
        }
        document.getElementById("group").innerHTML = "団体割引適用あり";
    }else{
        document.getElementById("group").innerHTML = "団体割引適用なし";
    }
    
    //小計を表示
    for(var i=0; i<tableElements.length; i++){
        tableElements[i].getElementsByClassName('field')[0].value = subtotal[i];
    }
    
    //合計を表示
    document.form.field_total.value = totalprice;
}