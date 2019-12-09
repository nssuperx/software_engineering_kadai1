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
    for(var i=0;i<this.price.length;i++){
        priceElements[i].innerHTML = price[i].toString() + "円";
    }
    document.getElementById("group").innerHTML = "団体割引適用なし";
}

//計算
function calc() {
    var priceElements = document.getElementsByClassName("price");
    var num = new Array(priceElements.length);
    var kenmin_num = new Array(priceElements.length);
    var normal_num = new Array(priceElements.length);
    var subtotal = new Array(priceElements.length);

    for(var i=0;i<priceElements.length;i++){
        //少数を入力されたとき、負の数を入力されたとき、県民の数がもとの人数より多いとき対策
        num[i] = Math.max(parseInt(priceElements[i].form.number.value), 0);
        kenmin_num[i] = Math.min(Math.max(parseInt(priceElements[i].form.kenmin.value), 0), adult_num);
        normal_num[i] = num[i] - kenmin_num[i];
        //小計
        subtotal[i] = normal_num[i] * price[i] + kenmin_num[i] * (price[i] * (1 - discount_rate_kenmin));
    }

    //合計を計算
    var total = adult + univ_stu + high_stu + elem_stu + infant + over60 + per_disability;
    document.getElementById("group").innerHTML = "団体割引適用なし";

    //10人以上だったら
    if ((adult_num + univ_stu_num + high_stu_num + elem_stu_num + infant_num + over60_num + per_disability_num) >= 10) {
        total = total * (1 - discount_rate_group);
        adult = adult * (1 - discount_rate_group);
        univ_stu = univ_stu * (1 - discount_rate_group);
        high_stu = high_stu * (1 - discount_rate_group);
        elem_stu = elem_stu * (1 - discount_rate_group);
        infant = infant * (1 - discount_rate_group);
        over60 = over60 * (1 - discount_rate_group);
        per_disability = per_disability * (1 - discount_rate_group);
        document.getElementById("group").innerHTML = "団体割引適用あり";
    }
    
    //小計を表示
    document.form.field1.value = adult;
    document.form.field2.value = univ_stu;
    document.form.field3.value = high_stu;
    document.form.field4.value = elem_stu;
    document.form.field5.value = infant;
    document.form.field6.value = over60;
    document.form.field7.value = per_disability;
    
    //合計を表示
    document.form.field_total.value = total;
}