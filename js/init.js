// please note, 
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
// so use the below updated condition
const isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");
console.log("Latest version!");
if (isIOSChrome) {
   // is Google Chrome on IOS
} else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
   // is Google Chrome
} else { 
   $("#index-banner").html("<h1>PLEASE USE CHROME</h1>");
}

if (window.location.protocol === 'https:') {
    $("#index-banner").html("<h1>PLEASE GO TO OUR NEW RELEASE PAGE: <p></p> <a href='http://release.kaiworship.xyz'>Eleven 51 API release</a></h1>");
}

const commodities = ['Total',
        'Food',
        'HouseholdGood',
        'ClothingFootwareAndPersonalAccessory',
        'DepartmentStores',
        'CafesRestaurantsAndTakeawayFood',
        'Other'];
const categories = ['Total',
        'FoodAndLiveAnimals',
        'BeveragesAndTobacco',
        'CrudeMaterialAndInedible',
        'MineralFuelLubricantAndRelatedMaterial',
        'AnimalAndVegetableOilFatAndWaxes',
        'ChemicalsAndRelatedProducts',
        'ManufacturedGoods',
        'MachineryAndTransportEquipments',
        'OtherManufacturedArticles',
        'Unclassified'];


$(document).ready(() => {
    Materialize.updateTextFields();
    $('select').material_select();
    $('#stats-area').on("change", (e) => {
        const value = e.target.value;
        const list = value === 'MerchandiseExports' ? categories : commodities;
        const cat = $('<select id="categories" multiple>');
        const defaultOption = $("<option disabled>");
        let first = true;
        defaultOption.text("Choose the categories");
        cat.append(defaultOption);
        list.map(function (choice) {
            const newOption = first? $('<option selected>') : $('<option>');
            first = false;
            newOption.text(choice.replace(/([A-Z])/g, ' $1')
                .replace(/^./, function(str){ return str.toUpperCase(); }));
            window.no = newOption;
            newOption.val(choice);
            window.cat = cat;
            cat.append(newOption);
        });
        $('#catDiv').text('').append(cat);
        cat.material_select();
    });
    $('.datepicker').pickadate({
	format: 'yyyy-mm-dd',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 22 // Creates a dropdown of 15 years to control year
      });

    $('#submit-button').on("click", () => {
        const stats = $("#stats-area").val() || 'Retail';
        const categ = $("#categories").val() || 'Total';
        const states = $("#states").val() || '';
        const endDate = $("#endDate").val();
        const startDate = $("#startDate").val();

        const requestUrl = `http://api.kaiworship.xyz/v2/${stats}/${categ}/${states}`;
        const resultdisp = $("#result-display");

        resultdisp.text("Loading...");
        $("#url").text(requestUrl);
        $.get(requestUrl,{startDate, endDate},(data) => {
                resultdisp.text(JSON.stringify(data, null, 4));
                hljs.highlightBlock(resultdisp);
            })
            .fail((error) => {
                console.log(error);
                const resultdisp = $("#result-display");
                resultdisp.text(JSON.stringify(error, null, 4));
                hljs.highlightBlock(resultdisp);
            });
    })
});
