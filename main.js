//価格設定
var adult_price = 2000;
var univ_stu_price = 1500;
var high_stu_price = 1000;
var elem_stu_price = 500;
var infant_price = 0;
var over60_price = 1000;
var per_disability_price = 800;

var price = {"大人":2000,"大学生":1500,"高校生":1000,"小学生":500,"乳幼児":0,"60歳以上":1000,"身障者":800};

//割引率
var discount_rate_kenmin = 0.2;
var discount_rate_group = 0.1;

//価格表示
/*
document.getElementById("price1").innerHTML = adult_price + "円";
document.getElementById("price2").innerHTML = univ_stu_price + "円";
document.getElementById("price3").innerHTML = high_stu_price + "円";
document.getElementById("price4").innerHTML = elem_stu_price + "円";
document.getElementById("price5").innerHTML = infant_price + "円";
document.getElementById("price6").innerHTML = over60_price + "円";
document.getElementById("price7").innerHTML = per_disability_price + "円";

//団体割引が適用されているか表示する
document.getElementById("group").innerHTML = "団体割引適用なし";
*/

window.onload = function(){
    var priceElements = document.getElementsByClassName("price");
    for(key in price){
        
    }
}

//計算
function calc() {

    //大人
    var adult_num = Math.max(parseInt(document.form.number1.value), 0);
    var adult_kenmin_num = Math.min(Math.max(parseInt(document.form.kenmin1.value), 0), adult_num);
    //少数を入力されたとき、負の数を入力されたとき、県民の数がもとの人数より多いとき対策
    var adult_normal_num = adult_num - adult_kenmin_num;
    var adult = adult_normal_num * adult_price + adult_kenmin_num * (adult_price * (1 - discount_rate_kenmin)); // 単価を設定

    //大学生
    var univ_stu_num = Math.max(parseInt(document.form.number2.value), 0);
    var univ_stu_kenmin_num = Math.min(Math.max(parseInt(document.form.kenmin2.value), 0), univ_stu_num);
    var univ_stu_normal_num = univ_stu_num - univ_stu_kenmin_num;
    var univ_stu = univ_stu_normal_num * univ_stu_price + univ_stu_kenmin_num * (univ_stu_price * (1 - discount_rate_kenmin));            

    //高校生中学生
    var high_stu_num = Math.max(parseInt(document.form.number3.value), 0);
    var high_stu_kenmin_num = Math.min(Math.max(parseInt(document.form.kenmin3.value), 0), high_stu_num);
    var high_stu_normal_num = high_stu_num - high_stu_kenmin_num;
    var high_stu = high_stu_normal_num * high_stu_price + high_stu_kenmin_num * (high_stu_price * (1 - discount_rate_kenmin));            

    //小学生
    var elem_stu_num = Math.max(parseInt(document.form.number4.value), 0);
    var elem_stu_kenmin_num = Math.min(Math.max(parseInt(document.form.kenmin4.value), 0), elem_stu_num);
    var elem_stu_normal_num = elem_stu_num - elem_stu_kenmin_num;
    var elem_stu = elem_stu_normal_num * elem_stu_price + elem_stu_kenmin_num * (elem_stu_price * (1 - discount_rate_kenmin));

    //幼児
    var infant_num = Math.max(parseInt(document.form.number5.value), 0);
    var infant_kenmin_num = Math.min(Math.max(parseInt(document.form.kenmin5.value), 0), infant_num);
    var infant_normal_num = infant_num - infant_kenmin_num;
    var infant = infant_normal_num * infant_price + infant_kenmin_num * (infant_price * (1 - discount_rate_kenmin));

    //60歳以上
    var over60_num = Math.max(parseInt(document.form.number6.value), 0);
    var over60_kenmin_num = Math.min(Math.max(parseInt(document.form.kenmin6.value), 0), over60_num);
    var over60_normal_num = over60_num - over60_kenmin_num;
    var over60 = over60_normal_num * over60_price + over60_kenmin_num * (over60_price * (1 - discount_rate_kenmin));

    //身障者
    var per_disability_num = Math.max(parseInt(document.form.number7.value), 0);
    var per_disability_kenmin_num = Math.min(Math.max(parseInt(document.form.kenmin7.value), 0), per_disability_num);
    var per_disability_normal_num = per_disability_num - per_disability_kenmin_num;
    var per_disability = per_disability_normal_num * per_disability_price + per_disability_kenmin_num * (per_disability_price * (1 - discount_rate_kenmin));

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