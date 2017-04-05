// please note, 
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
// so use the below updated condition

const randomString = function(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

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
            newOption.val(choice);
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
        const categ = $("#categories").val().length === 0 ? 'Total' : $("#categories").val() || 'Total';
        const states = $("#states").val() || '';
        const endDate = $("#endDate").val();
        const startDate = $("#startDate").val() || '2016-01-01';

        console.log(categ);
        const baseUrl = `http://api.kaiworship.xyz/v2/${stats}/${categ}/${states}`;
        
        const params = '?${startDate}?${endDate}';
        var requestUrl = baseUrl.concat(params);

        const resultdisp = $("#result-display");
        var endDateParam = endDate == '' ? '':('/endDate='+ endDate);
        var requestUrlDisp = baseUrl.concat('/startDate=' + startDate + endDateParam);

        resultdisp.text("Loading...");
        $("#url").text(requestUrlDisp);
        $.get(requestUrl,(data) => {
                resultdisp.text(JSON.stringify(data, null, 4));
                hljs.highlightBlock(resultdisp[0]);
            })
            .fail((error) => {
                console.log(error);
                const resultdisp = $("#result-display");
                resultdisp.text(JSON.stringify(error, null, 4));
                hljs.highlightBlock(resultdisp[0]);
            });
    });

    $('#error-button').on("click", () => {
        const stats = 'Retail';
        const categ = (Math.random() > 0.5) ? 'Total': randomString(6);
        const states = (Math.random() > 0.5) ? 'UNSW': randomString(6);

        const requestUrl = `http://api.kaiworship.xyz/v2/${stats}/${categ}/${states}`;
        const resultdisp = $("#result-display");

        resultdisp.text("Loading...");
        $("#url").text(requestUrl);
        $.get(requestUrl,(data) => {
                resultdisp.text(JSON.stringify(data, null, 4));
                hljs.highlightBlock(resultdisp[0]);
            })
            .fail((error) => {
                console.log(error);
                const resultdisp = $("#result-display");
                resultdisp.text(JSON.stringify(error, null, 4));
                hljs.highlightBlock(resultdisp[0]);
            });
    });
});
