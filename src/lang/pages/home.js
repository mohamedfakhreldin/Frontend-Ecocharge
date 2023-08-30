import strings from "../lang";

var homeLang=strings.setContent({
    en:{
        caption1:'Egypt is establishing an electric vehicle charging stations company worth almost 150 million EGP',
        caption2:'there are more than 70 Electric Station in Egypt',
        caption3:'Electric stations in Egypt'
    },
    ar:{
        caption1:'مصر تؤسس شركة لمحطات شحن السيارات الكهربائية بقيمة تقارب 150 مليون جنيه',
        caption2:'يوجد أكثر من 70 محطة كهرباء في مصر',
        caption3:'محطات شحن كهربائية فى مصر'
    }
})
console.log(strings);
homeLang.setLanguage('en')
export { homeLang}