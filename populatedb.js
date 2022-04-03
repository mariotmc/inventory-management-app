#! /usr/bin/env node

const async = require("async");
const Category = require("./models/categoryModel");
const Product = require("./models/productModel");

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://Mario:mongo@managementinventory.juytd.mongodb.net/Inventory?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const categories = [];
const products = [];

const categoryCreate = (name, cb) => {
  const category = new Category({ name: name });

  category.save((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
};

const productCreate = (name, category, brand, description, price, cb) => {
  productdetail = {
    name: name,
    category: category,
    brand: brand,
    description: description,
    price: price,
  };

  if (category != false) productdetail.category = category;

  const product = new Product(productdetail);

  product.save((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("New Product: " + product);
    products.push(product);
    cb(null, product);
  });
};

const createCategories = (cb) => {
  async.series(
    [
      (callback) => {
        categoryCreate("Sweet", callback);
      },
      (callback) => {
        categoryCreate("Sour", callback);
      },
      (callback) => {
        categoryCreate("Chewing Gum", callback);
      },
      (callback) => {
        categoryCreate("Bon Bons", callback);
      },
      (callback) => {
        categoryCreate("Chocolate", callback);
      },
      (callback) => {
        categoryCreate("Fizzy", callback);
      },
      (callback) => {
        categoryCreate("Jelly", callback);
      },
      (callback) => {
        categoryCreate("Licorice", callback);
      },
      (callback) => {
        categoryCreate("Organic", callback);
      },
      (callback) => {
        categoryCreate("Sugar Free", callback);
      },
    ],
    cb
  );
};

// prettier-ignore
const createProducts = (cb) => {
  async.parallel(
    [
      (callback) => {
        productCreate(
          "Giant Rice Crispy Treats",
          categories[0],
          "Crispery",
          "Jumbo rice crispy squares you can really sink your teeth into! Featuring a moist marshmallow crisp taste and colorful milk chocolate drops on top, these enormous treats are sure to be the hit of the party!",
          4.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Werther's Original Candy Assortment",
          categories[0],
          "Werther's Original",
          "Sugar isn’t invited to Werther’s latest mixer. But with Classic Caramel, Caramel Chocolate, and Caramel Coffee on the guest list the party is still destined to have a sweet flavor. Join the fun when you grab this bag of Sugar Free Werther’s Orignal Assorted Hard Candy.",
          10.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Reed's Hard Candy Rolls - Cinnamon",
          categories[0],
          "Reed's",
          "The priceless ingredients of every product are the honor and integrity of its maker. This has been the Reed’s motto since two innovative brothers and their father began crafting hard candy patties in 1893, and this brand remains one of the few manufacturers in the world that still molds sweets from a heated syrup state and then individually wraps each piece.",
          3.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Dark Chocolate Covered Orange Jelly Candy Sticks",
          categories[0],
          "Sweet Candy Company",
          "An American favorite since 1945, these deluxe fruit and chocolate treats are a perfect way to make any occasion extra special! Naturally flavored, a mouth-watering orange jelly center is surrounded by a deep, dark chocolate blanket. Perfect in gift baskets or on their own, these decadent orange sticks are tidily packaged in a pretty box that is guaranteed to impress.",
          10.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "SweeTarts Tangy Candy",
          categories[0],
          "SweeTARTS",
          "Sweet and tart combine to make a treat that will bring you back for second helpings over and over again! Sweet Tarts candy in movie theater boxes allow you to enjoy your favorite snack in your own living room with enough candy to last through any binge watching session.",
          2.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Sour Patch Kids Candy Red, White, & Blue",
          categories[1],
          "Sour Patch Kids",
          "Resealable bag contains 1.8 pounds of Red, White, and Blue Sour Patch Kids Candy... that's about 330 pieces.",
          10.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Sour Punch Bites",
          categories[1],
          "Sour Punch",
          "Treat yourself to SOUR PUNCH® Bites® in four Rad Red sour candy flavors.  Mix & match the following fruity favorites: Strawberry, Watermelon, Cherry & Raspberry.  The resealable bag makes for soft & chewy candy that you can enjoy on many movie nights to come.",
          4.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Sour Skittles",
          categories[1],
          "Skittles",
          `Skittles, time to break out your "I'm just eating sour Skittles" sign. The puckering of lips, drawn cheekbones, pinched eyebrows, and watery eyes will ensue once you open this resealable bag of sour Skittles candy and pop a few into your mouth. So it's better to prepare yourself so you don't have to explain your face.`,
          4.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "WarHeads Smashups Extreme Sour Hard Candy",
          categories[1],
          "WarHeads",
          "Put a tangy twist on candy party favor bags when you add this new-fangled super sour candy! Warheads® hard candies are an all-time favorite that may scrunch up your face, but you'll still enjoy the enticing fruity taste!",
          1.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Sour Rip Rolls",
          categories[1],
          "Rip Rolls",
          "Super sour blue raspberry flavors are steam rolled into a 40 inch long chewy tape candy!",
          1.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Wrigley's Doublemint Gum",
          categories[2],
          "Wrigley's",
          "Double the flavor, double the pleasure!",
          15.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "5 Gum - Cobalt",
          categories[2],
          "5 Gum",
          "The latest high tech gum invention from Wrigley's research labs! These amazing chewing gum sticks are infused with ultra long lasting peppermint flavor. Plus, the Cobalt packaging is very cool.... shiny blue metallic wrappers and sleek black sleeves.",
          2.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Wrigley's Juicy Fruit Gum",
          categories[2],
          "Wrigley's",
          "Delicious chewing gum featuring a long lasting fruity flavor!",
          15.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Orbit Peppermint Gum",
          categories[2],
          "Orbit",
          "Blast your breath with bold minty freshness by popping a piece of Orbit peppermint gum. It's sugar-free and sweetened with xylitol, so it's a low-calorie, diet-friendly chewing gum choice that's also safe for your teeth.",
          2.00,
          callback
        );
      },
      (callback) => {
        productCreate("Fruit Stripe Bubble Gum", categories[2], "brand", "description", 5.0, callback);
      },
      (callback) => {
        productCreate(
          "Eiffel Chewy Bon Bons",
          categories[3],
          "Eiffel",
          "These unique, bite-sized candies are bursting with caramel flavor.",
          3.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Flavigny Pastilles Candy Tin",
          categories[3],
          "Les Anis de Flavigny",
          "Impress your friends with your refined tastes. Have delicately scented breath thanks to these these dainty little pastilles, each with an aniseed surprise at the center. Subtly-flavored mints are handsomely presented in a reusable tin.",
          6.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Cedrinca Liquor Hard Candy Jar",
          categories[3],
          "Cedrinca",
          "For more than a century, Cedrinca has been sweetening palates the natural way with their delicious, pleasantly-packaged Italian confections. Free of preservatives, these decadent hard candies are bursting with surprising liquor flavors!",
          35.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Cavendish and Harvey Fruit Hard Candy",
          categories[3],
          "Cavendish and Harvey",
          "Cavendish & Harvey have been making their beloved hard candies in Europe for over sixty years. Presented in an elegant glass jar with some nice heft to it, these fruit flavored treats make an ideal gift for anyone with a taste for quality!",
          20.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Arcor Viena Fruit Filled Hard Candy",
          categories[3],
          "Arcor",
          "Dropping an Arcor Viena Fruit Hard Candy into your mouth is like having flavor visions.",
          7.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Hershey's Milk Chocolate with Almonds Candy Bar",
          categories[4],
          "Hershey Chocolate",
          "It's The Great American Chocolate Bar featuring delicious almonds!",
          5.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "M&M's Milk Chocolate Candy - Platinum Shimmer",
          categories[4],
          "M&M's",
          "Maybe you’re planning your platinum birthday, silver wedding anniversary, or New Year’s Eve party. Even though you could use silver accents to create the fete of the year, we have something better in mind to make your event go from basic to sophisticated. You’re wondering what’s on our brain? This two pound bag of Platinum Shimmer M&M’s of course.",
          20.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Ritter Sport Milk Chocolate Bars With Praline Filling",
          categories[4],
          "Ritter Sport",
          "Even with chocolate, it's what's on the inside that counts. This bar's main attraction is its creamy premium praline filling. Lots of hazelnuts, roasted golden-brown and finely ground, giving it an intense, nutty taste. The result: love at first bite.",
          3.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "DeMet's Turtles Minis",
          categories[4],
          "Turtles Candy",
          "Turtles are divided into two zoological groups according to how they retract their necks into their shells. The Cryptodira retract their necks backwards while contracting it under their spine, whereas the Pleurodira contract their necks to the side. You won't be retracting your neck AT ALL... you'll be elongating your neck so that your mouth can reach more of these delicious morsels... scrumptious clusters of almonds and caramel smothered in rich dark chocolate.",
          7.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Asher's Sugar Free Chocolate Candy Bars",
          categories[4],
          "Asher's Chocolates",
          "Yummy sugar free milk chocolate bars from Asher's Chocolates! Delicious low-carb candy bars with about 1 gram of carbs... sugar free and low sodium too!",
          36.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Pop Rocks Candy Packs - Strawberry",
          categories[5],
          "Pop Rocks",
          "Pop! Crackle! Snap! - candy that explodes with strawberry flavors inside your mouth!",
          1.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Crack-Ups Popping Candy",
          categories[5],
          "World Confections",
          "Crackling and popping candy nuggets in nifty mini packs.",
          1.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Lion Soda Hard Candy Balls",
          categories[5],
          "Lion",
          "Bright metallic wrappers hold small hard candy balls in a variety of 8 fabulous flavors. Apple, Grape, Strawberry, Orange, Ramune (lemon-lime soda), Lemon, Melon, and Cola. These tangy flavors also have a slight effervescence making them an intriguing soda experience. Made with real fruit juice.",
          7.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Kandy KA-BOOM Cherry Popping Candy Dynamite Sticks",
          categories[5],
          "Kandy",
          "Ka-BOOM! Sour cherry popping candy packets are sealed inside plastic dynamite sticks, making these the perfect party favors for birthdays and American patriotic events like 4th of July celebrations. Each Kandy KA-BOOM container is filled with EIGHT SOUR CHERRY POPPING CANDY packages. Experience the explosive sour power for yourself when you ignite Kandy Ka-BOOM Cherry Popping Candy inside your mouth!",
          3.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Kasugai Fizzing Soda Hard Candy",
          categories[5],
          "Kasugai",
          "Fun hard candy discs featuring an assortment of yummy soda flavors and a fizzing, carbonated sensation. Each piece is wrapped to seal in freshness.",
          6.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Krispy Kreme Doughnuts Jelly Beans",
          categories[6],
          "Jelly Belly",
          "Aaahhh! Nothing beats the sweet scent and rich balmy air of a Krispy Kreme doughnut shop after the baking of a fresh batch. Now recreated in candy form, these unique donut flavors of gourmet jelly beans are sure to surprise and delight your taste buds. Simply blend with Jelly Belly Cappuccino jelly beans for the perfect morning snack!",
          20.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "49 Flavors Jelly Beans",
          categories[6],
          "Jelly Belly",
          "Delicious gourmet jelly beans an assortment of 49 fabulous flavors and colors!",
          30.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Starburst Jelly Beans",
          categories[6],
          "Starburst",
          "Experience the outrageous burst of delicious fruit flavors you know and love, mixed with the satisfying chew of jelly beans. You’ll never look at candy (or outer space) the same way again.",
          4.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Camo Jelly Beans",
          categories[6],
          "Jelly Belly",
          "Perfect for a snack-themed hide-and-go-sneak on your next camping trip, these Jelly Bellies will blend in effortlessly with the great outdoors! Now, even if your candy-snatching foes happen to catch a whiff of your jelly beans, they’ll never be able to find them.",
          30.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Bean Boozled Fiery Five Jelly Beans",
          categories[6],
          "Jelly Belly",
          "Put your palate to the test with the spicy challenge inside each bag of Jelly Belly Bean Boozled fiery five jelly beans. The authentic chili pepper flavor gets progressively hotter as you work your way up from the relatively mild sriracha and jalapeño, through the caliente cayenne and habanero, finishing up with the off-the-charts en fuego of the Carolina Reaper.",
          30.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Gustaf's Licorice Allsorts Candy",
          categories[7],
          "Allsorts",
          "Some say licorice is an acquired taste and this might be true; however, we do know it’s acquired by those who don’t just give up on the first bite. Their resilience allows them to get acquainted with the root-like flavor to develop a lifelong bond.",
          10.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Red Vines Made Simple Mini Bites",
          categories[7],
          "Red Vines",
          "Dig in to RED VINES® Made Simple Mini Bites in Mixed Berry fruit licorice flavor.  Free from GMOs and artificial flavors & colors, you can feel great about adding this better-for-you licorice to your pantry.",
          5.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Twizzlers Licorice Filled Bites - Strawberry",
          categories[7],
          "Twizzlers",
          "It's the classic Twizzlers Bite with a tasty surprise inside! Each chewy licorice piece is filled with a delicious strawberry flavored center. Try to eat just a handful -- we dare you!",
          4.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Twizzlers Rainbow Licorice Twists",
          categories[7],
          "Twizzlers",
          "Materializing in only the boldest hues on the color spectrum, Twizzler's rainbow mix contains the fresh fruit flavors of raspberry, watermelon, lemonade, orange and strawberry. Casually spiraled, these chewy treats offer just enough variety that you might find yourself with an empty bag after just one solo sitting.",
          4.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Wiley Wallaby Blasted Berry Licorice Bites",
          categories[7],
          "Wiley Wallaby",
          "Soft, chewy & bursting with flavor!  Blasted Berry features a mix of Huckleberry, Blueberry Pomegranate and Triple Berry licorice bites.",
          6.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "YumEarth Organic Lollipops Fruit Assortment",
          categories[8],
          "YumEarth",
          "Certified USDA Organic! YumEarth tastes so much better than chemical candy because they flood YummyEarth lollipops with a special blend of natural fruit extracts for outrageous mouthwatering flavor. Each flavor is handcrafted and taste tested by the company founders and their children.",
          1.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Brach's Natural Sources Candy Corn",
          categories[8],
          "Brach's",
          "Crafted from only the finest natural ingredients, Brach's Natural Sources Candy Corn offers this Halloween candy classic in its purest form. Made with real honey and unadulterated components for color and flavor sourced directly from nature, Brach's All Natural Candy Corn provides all the appeal of traditional candy corn without the artificial ingredients.",
          5.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Black Forest Organic Gummy Bears",
          categories[8],
          "Black Forest",
          "Get back to nature with these organic Black Forest gummy bears in assorted fruit flavors! Each gummy bear is gluten-free and fat free, with no artificial flavors to spoil the fun.",
          3.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "White All Natural Sugar Candy Sticks",
          categories[8],
          "Hammond's",
          "Delicious vanilla-flavored candy sticks with a soft white sheen. Made with all natural ingredients.",
          6.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Dolcetto Lemon-Filled Wafer Bites",
          categories[8],
          "Dolcetto Petites",
          "Light and crispy, sweet and zesty, these snappy little lemon wafer bites are the perfect mid-afternoon snack. Just slip a 100-calorie pack from your backpack or briefcase and indulge in a guilt-free treat that leaves you feeling refreshed and satisfied—not weighed down with sugar.",
          15.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Jols Pastilles Sugar Free Candy - Black Currant",
          categories[9],
          "JOLS",
          "Aye mate, have you tried these yummy sugar free treats from Australia? The unique recipe of JOLS Pastilles, based on the natural fruit juice flavours and concentrated real fruit juices, provides luscious mouthwatering enjoyment without sugar or fat.",
          2.00,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Jols Pastilles Sugar Free Candy - Forest Berries",
          categories[9],
          "JOLS",
          "Aye mate, have you tried these yummy sugar free treats from Australia? The unique recipe of JOLS Pastilles, based on the natural fruit juice flavours and concentrated real fruit juices, provides luscious mouthwatering enjoyment without sugar or fat.",
          2.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Sugar Free Mini York Peppermint Patties",
          categories[9],
          "York Peppermint Patties",
          "Sugar free dark chocolate candy covered peppermint patties! Each piece is pillow wrapped to seal in freshness.",
          0.50,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Zollipops Sugar Free Fruit Lollipops",
          categories[9],
          "Zollipops",
          "Experience the fabulous fruit flavors and the smooth, clean feeling Zollipops® deliver as they help bring a healthy pH level to your mouth and leave your teeth feeling clean and refreshed. Perfect for the office lobby or reception desk, these sweet suckers are parent approved AND doctor approved!",
          0.10,
          callback
        );
      },
      (callback) => {
        productCreate(
          "Altoids Smalls Mint Tins",
          categories[9],
          "Altoids",
          "Treat your mouth to a cool, refreshing blast that freshens breath in seconds with Altoids Smalls wintergreen mints. The intensely chilly flavor of an Altoids wintergreen mint removes every trace of the double espresso or pasta pesto you’ve just enjoyed, letting you get up close and personal with people in relaxed confidence.",
          2.00,
          callback
        );
      },
    ],
    cb
  );
};

async.series([createCategories, createProducts], (err, results) => {
  if (err) {
    console.log("FINAL ERR: " + err);
  }

  mongoose.connection.close();
});
