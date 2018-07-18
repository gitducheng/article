function computeDaysDelta(date1, date2) {
    let delta = (date2 - date1) / (1000 * 60 * 60 * 24) + 1;
    let weekEnds = 0;
    if (delta < 0) {
        return -1;
    } else {
        for (let i = 0; i < delta; i++) {
            let superArr = ["2018-07-01", "2018-07-03", "2018-07-04"] //设置法定节假日

            let y = 1900 + date1.getYear();
            let m = "0" + (date1.getMonth() + 1);
            let d = "0" + date1.getDate();
            let superDate = y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);

            let status = superArr.indexOf(superDate);

            if (date1.getDay() == 0 || date1.getDay() == 6 || status !== -1) {
                weekEnds++;
            }
            date1 = date1.valueOf();
            date1 += 1000 * 60 * 60 * 24;
            date1 = new Date(date1);
        }
        let result = delta - weekEnds;
        return result;
    }

}

let t1 = new Date();
let t2 = new Date();
t2.setDate(t2.getDate() + 7);
let last = computeDaysDelta(t1, t2);
console.log(last)