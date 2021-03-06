'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
   await queryInterface.bulkInsert('Ingredients', [
    {"name": "Absinthe", "abv": 40, "taste": null},
    {"name": "Aperol", "abv": 11, "taste": "bitter"},
    {"name":"Apricot brandy", "abv": 40, "taste": null},
    {"name": "Blackberry liqueur", "abv": 40, "taste": null},
    {"name":"Cachaca", "abv": 40, "taste": null },
    {"name":"Calvados","abv": 40,
      "taste": null
    },
    {"name":"Campari","abv": 25,
      "taste": null
    },
    {"name":"Champagne","abv": 12,
      "taste": null
    },
    {"name":"Cherry liqueur","abv": 30,
      "taste": null
    },
    {"name":"Coconut milk","abv": 0,
      "taste": "sweet"
    },
    {"name":"Coffee liqueur","abv": 20,
      "taste": "bitter"
    },
    {"name":"Cognac","abv": 40,
      "taste": null
    },
    {"name":"Cola","abv": 0,
      "taste": "bitter"
    },
    {"name":"Cranberry juice","abv": 0,
      "taste": "sour"
    },
    {"name":"Cream","abv": 0,
      "taste": "sweet"
    },
    {"name":"Cream liqueur","abv": 20,
      "taste": null
    },
    {"name":"Créme liqueur","abv": 20,
      "taste": null
    },
    {"name":"Dark rum","abv": 40,
      "taste": null
    },
    {"name":"DiSaronno", "abv": 28,
      "taste": null
    },
    {"name":"DOM Bénédictine", "abv": 40,
      "taste": null
    },
    {"name":"Drambuie","abv": 40,
      "taste": null
    },
    {"name":"Dry White Wine", "abv": 12,
      "taste": null
    },
    {"name":"Egg yolk","abv": 0,
      "taste": null
    },
    {"name":"Galliano","abv": 30,
      "taste": "sweet"
    },
    {"name":"Gin","abv": 40,
      "taste": null
    },
    {"name":"Ginger Ale","abv": 0,
      "taste": null
    },
    {"name":"Ginger beer","abv": 5,
      "taste": "sweet"
    },
    {"name":"Grapefruit juice","abv": 0,
      "taste": "sour"
    },
    {"name":"Hot coffee", "abv": 0,
      "taste": "bitter"
    },
    {"name":"Kirsch","abv": 40,
      "taste": null
    },
    {"name":"Lemon juice","abv": 0,
      "taste": "sour"
    },
    {"name":"Lillet Blonde","abv": 15,
      "taste": null
    },
    {"name":"Lime juice","abv": 0,
      "taste": "sour"
    },
    {"name":"Olive juice","abv": 0,
      "taste": "sour"
    },
    {"name":"Orange Bitters","abv": 40,
      "taste": null
    },
    {"name":"Orange juice","abv": 0,
      "taste": "sweet"
    },
    {"name":"Peach puree", "abv": 0,
      "taste": "sweet"
    },
    {"name":"Peach schnapps","abv": 40,
      "taste": "sweet"
    },
    {"name":"Pineapple juice","abv": 0,
      "taste": "sweet"
    },
    {"name":"Pisco","abv": 40,
      "taste": null
    },
    {"name":"Prosecco","abv": 12,
      "taste": null
    },
    {"name":"Raspberry liqueur","abv": 20,
      "taste": "sweet"
    },
    {"name":"Red Port", "abv": 20,
      "taste": null
    },
    {"name":"Soda water","abv": 0,
      "taste": null
    },
    {"name":"Syrup","abv": 0,
      "taste": "sweet"
    },
    {"name":"Tequila","abv": 40,
      "taste": null
    },
    {"name":"Tomato juice","abv": 0,
      "taste": "salty"
    },
    {"name":"Triple Sec","abv": 40,
      "taste": "sweet"
    },
    {"name":"Vermouth","abv": 17,
      "taste": null
    },
    {"name":"Vodka", "abv": 40,
      "taste": null
    },
    {"name":"Whiskey","abv": 40,
      "taste": null
    },
    {"name":"White rum", "abv": 40,
      "taste": null
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
