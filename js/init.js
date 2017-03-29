const categories = ['Total',
    'Food',
    'HouseholdGood',
    'ClothingFootwareAndPersonalAccessory',
    'DepartmentStores',
    'CafesResturantsAndTakeawayFood',
    'Other'];
const commodities = ['Total',
    'FoodAndLiveAnimals',
    'BeveragesAndTobacco',
    'CrudMaterialAndInedible',
    'MineralFuelLubricentAndRelatedMaterial',
    'AnimalAndVegitableOilFatAndWaxes',
    'ChemicalsAndRelatedProducts',
    'ManufacutedGoods',
    'MachineryAndTransportEquipments',
    'OtheranucacturedArticles',
    'Unclassified'];


$(document).ready(function() {
    Materialize.updateTextFields();
    $('select').material_select();
    $('#stats-area').on("change", function(e) {
        const value = e.target.value;
        const list = value === "merch" ? categories : commodities;
        const cat = $('<select id="categories" multiple>');
        list.map(function (choice) {
            const newOption = $('<option>');
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
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });
});