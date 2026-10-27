
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Pastel Rose Floral Dress",
    description: "Soft pink floral dress for everyday elegance.",
    price: 1299,
    category: "Dresses",
    stock: 15,
  },
  {
    name: "Lavender Bloom Maxi Dress",
    description: "Flowy lavender maxi with delicate floral prints.",
    price: 1799,
    category: "Dresses",
    stock: 12,
  },
  {
    name: "Peach Blossom Midi Dress",
    description: "Peach midi dress with a romantic floral pattern.",
    price: 1499,
    category: "Dresses",
    stock: 10,
  },
  {
    name: "Mint Garden Sundress",
    description: "Fresh mint sundress with tiny garden flowers.",
    price: 1199,
    category: "Dresses",
    stock: 18,
  },
  {
    name: "Daisy Dreams Dress",
    description: "Cream dress decorated with cheerful daisy prints.",
    price: 1399,
    category: "Dresses",
    stock: 14,
  },
  {
    name: "Blush Petal Wrap Dress",
    description: "Elegant wrap dress in a gentle blush shade.",
    price: 1599,
    category: "Dresses",
    stock: 11,
  },
  {
    name: "Bluebell Cottage Dress",
    description: "Powder blue dress with a cottagecore floral look.",
    price: 1699,
    category: "Dresses",
    stock: 9,
  },
  {
    name: "Buttercup Summer Dress",
    description: "Light yellow dress with delicate buttercup prints.",
    price: 1299,
    category: "Dresses",
    stock: 16,
  },
  {
    name: "Sage Meadow Maxi",
    description: "Sage green maxi dress with meadow-inspired flowers.",
    price: 1899,
    category: "Dresses",
    stock: 8,
  },
  {
    name: "Lilac Garden Party Dress",
    description: "A graceful lilac dress for parties and outings.",
    price: 1999,
    category: "Dresses",
    stock: 7,
  },
  {
    name: "Pink Petal Puff Sleeve Dress",
    description: "Pastel pink dress with charming puff sleeves.",
    price: 1499,
    category: "Dresses",
    stock: 13,
  },
  {
    name: "Ivory Floral Tiered Dress",
    description: "Ivory tiered dress with soft floral detailing.",
    price: 1799,
    category: "Dresses",
    stock: 10,
  },
  {
    name: "Peach Garden Shirt Dress",
    description: "Relaxed shirt dress with a peach floral print.",
    price: 1599,
    category: "Dresses",
    stock: 12,
  },
  {
    name: "Rosewater Pleated Dress",
    description: "Pleated rose-pink dress with a delicate finish.",
    price: 1899,
    category: "Dresses",
    stock: 9,
  },
  {
    name: "Spring Blossom A-Line Dress",
    description: "Classic A-line dress with tiny spring blossoms.",
    price: 1399,
    category: "Dresses",
    stock: 15,
  },
  {
    name: "Cloud Blue Floral Top",
    description: "Powder blue top with an airy floral print.",
    price: 799,
    category: "Tops",
    stock: 20,
  },
  {
    name: "Blush Daisy Blouse",
    description: "Blush blouse with daisy details and a soft drape.",
    price: 899,
    category: "Tops",
    stock: 18,
  },
  {
    name: "Lavender Petal Top",
    description: "Everyday lavender top with delicate petals.",
    price: 699,
    category: "Tops",
    stock: 22,
  },
  {
    name: "Mint Floral Peplum Top",
    description: "Mint peplum top with a flattering silhouette.",
    price: 999,
    category: "Tops",
    stock: 14,
  },
  {
    name: "Cream Rose Embroidered Top",
    description: "Cream top with subtle rose-inspired embroidery.",
    price: 1099,
    category: "Tops",
    stock: 12,
  },
  {
    name: "Peach Blossom Crop Top",
    description: "A cute peach crop top with tiny flower prints.",
    price: 649,
    category: "Tops",
    stock: 25,
  },
  {
    name: "Sage Garden Button Top",
    description: "Sage button-front top with botanical details.",
    price: 899,
    category: "Tops",
    stock: 16,
  },
  {
    name: "Lilac Puff Sleeve Blouse",
    description: "Romantic lilac blouse with puff sleeves.",
    price: 1199,
    category: "Tops",
    stock: 11,
  },
  {
    name: "Buttercream Floral Tee",
    description: "Comfortable buttercream T-shirt with floral art.",
    price: 599,
    category: "Tops",
    stock: 28,
  },
  {
    name: "Pink Meadow Tunic",
    description: "Long pink tunic with a soft meadow print.",
    price: 1099,
    category: "Tops",
    stock: 14,
  },
  {
    name: "Pastel Petal Midi Skirt",
    description: "Flowy midi skirt with pastel petal prints.",
    price: 1199,
    category: "Skirts",
    stock: 13,
  },
  {
    name: "Lavender Garden Pleated Skirt",
    description: "Lavender pleated skirt for a graceful outfit.",
    price: 1399,
    category: "Skirts",
    stock: 10,
  },
  {
    name: "Peach Blossom A-Line Skirt",
    description: "Peach A-line skirt with delicate blossoms.",
    price: 999,
    category: "Skirts",
    stock: 16,
  },
  {
    name: "Sage Meadow Maxi Skirt",
    description: "Sage maxi skirt inspired by peaceful gardens.",
    price: 1499,
    category: "Skirts",
    stock: 9,
  },
  {
    name: "Bluebell Floral Mini Skirt",
    description: "Powder blue mini skirt with tiny flowers.",
    price: 899,
    category: "Skirts",
    stock: 18,
  },
  {
    name: "Rose Garden Co-ord Set",
    description: "Matching pastel rose top and bottom set.",
    price: 2199,
    category: "Co-ord Sets",
    stock: 8,
  },
  {
    name: "Mint Blossom Co-ord Set",
    description: "Mint two-piece set with subtle floral details.",
    price: 2299,
    category: "Co-ord Sets",
    stock: 7,
  },
  {
    name: "Lavender Lounge Co-ord",
    description: "Relaxed lavender co-ord for comfortable days.",
    price: 1999,
    category: "Co-ord Sets",
    stock: 10,
  },
  {
    name: "Peach Petal Co-ord Set",
    description: "Peach matching set with a soft feminine style.",
    price: 2099,
    category: "Co-ord Sets",
    stock: 9,
  },
  {
    name: "Daisy Field Co-ord Set",
    description: "Cream co-ord decorated with delicate daisies.",
    price: 2399,
    category: "Co-ord Sets",
    stock: 6,
  },
  {
    name: "Pastel Rose Kurti",
    description: "Everyday kurti with a gentle rose print.",
    price: 999,
    category: "Kurtis",
    stock: 20,
  },
  {
    name: "Lavender Floral Kurti",
    description: "Lavender kurti with a light botanical pattern.",
    price: 1099,
    category: "Kurtis",
    stock: 17,
  },
  {
    name: "Mint Garden Straight Kurti",
    description: "Straight-fit mint kurti for everyday wear.",
    price: 899,
    category: "Kurtis",
    stock: 19,
  },
  {
    name: "Peach Blossom Anarkali",
    description: "Flowy peach Anarkali with floral detailing.",
    price: 1899,
    category: "Kurtis",
    stock: 8,
  },
  {
    name: "Bluebell Printed Kurti",
    description: "Powder blue kurti with tiny bluebell flowers.",
    price: 1199,
    category: "Kurtis",
    stock: 14,
  },
  {
    name: "Rose Petal Summer Jumpsuit",
    description: "Pastel rose jumpsuit with a breezy fit.",
    price: 1799,
    category: "Jumpsuits",
    stock: 9,
  },
  {
    name: "Mint Meadow Jumpsuit",
    description: "Mint jumpsuit with a soft garden-inspired print.",
    price: 1899,
    category: "Jumpsuits",
    stock: 8,
  },
  {
    name: "Lilac Bloom Playsuit",
    description: "Playful lilac playsuit with floral detailing.",
    price: 1499,
    category: "Jumpsuits",
    stock: 11,
  },
  {
    name: "Peach Blossom Jumpsuit",
    description: "Peach one-piece outfit for sunny days.",
    price: 1699,
    category: "Jumpsuits",
    stock: 10,
  },
  {
    name: "Ivory Daisy Shrug",
    description: "Light ivory shrug with a delicate daisy motif.",
    price: 799,
    category: "Shrugs",
    stock: 15,
  },
  {
    name: "Lavender Garden Shrug",
    description: "Soft lavender layering piece with floral charm.",
    price: 899,
    category: "Shrugs",
    stock: 12,
  },
  {
    name: "Pastel Rose Lightweight Cardigan",
    description: "Light cardigan in rose pink for cooler evenings.",
    price: 1299,
    category: "Cardigans",
    stock: 10,
  },
  {
    name: "Sage Blossom Lightweight Cardigan",
    description: "Sage cardigan with a soft, timeless finish.",
    price: 1399,
    category: "Cardigans",
    stock: 8,
  },
  {
    name: "Daisy Dream Summer Co-ord",
    description: "Fresh summer co-ord with a cheerful daisy print.",
    price: 1999,
    category: "Co-ord Sets",
    stock: 10,
  },
  {
    name: "Blush Rose Occasion Dress",
    description: "Elegant blush occasion dress with floral accents.",
    price: 2499,
    category: "Dresses",
    stock: 5,
  },
];

async function seedProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI missing. Check that your .env file is inside backend/"
      );
    }

    if (products.length !== 50) {
      throw new Error(
        `Expected 50 products, received ${products.length}`
      );
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");

    const operations = products.map((product, index) => ({
      updateOne: {
        filter: { name: product.name },
        update: {
          $set: {
            ...product,
            image: `/images/dresses/dress-${String(index + 1).padStart(2, "0")}.jpg`,
          },
        },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(operations);

    console.log("Product seeding completed!");
    console.log(`Products in seed list: ${products.length}`);
    console.log(`New products inserted: ${result.upsertedCount}`);
    console.log(`Existing products updated: ${result.modifiedCount}`);
    console.log(
      "Image files should be placed in frontend/public/images/dresses/"
    );
  } catch (error) {
    console.error("Product seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

const categoryQueries = {
  Dresses: "women floral dress fashion",
  Tops: "women floral blouse fashion",
  Skirts: "women floral skirt fashion",
  "Co-ord Sets": "women two piece outfit fashion",
  Kurtis: "women kurta fashion",
  Jumpsuits: "women jumpsuit fashion",
  Shrugs: "women fashion shrug",
  Cardigans: "women pastel cardigan fashion",
};

async function getPhotos(query) {
  const key = process.env.UNSPLASH_ACCESS_KEY;

  if (!key) {
    throw new Error(
      "UNSPLASH_ACCESS_KEY missing in backend/.env"
    );
  }

  const url = new URL(
    "https://api.unsplash.com/search/photos"
  );

  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "30");
  url.searchParams.set("orientation", "portrait");
  url.searchParams.set("content_filter", "high");

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${key}`,
      "Accept-Version": "v1",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Unsplash API error: ${response.status}. Check your Access Key and API limit.`
    );
  }

  const data = await response.json();
  return data.results.filter(
    (photo) =>
      photo.urls?.small &&
      photo.user?.name &&
      photo.user?.links?.html
  );
}

async function seedProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing in .env");
    }

    if (products.length !== 50) {
      throw new Error(
        `Expected 50 products, received ${products.length}`
      );
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");

    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    const photoPools = {};

    for (const category of categories) {
      console.log(`Searching Unsplash photos: ${category}`);

      photoPools[category] = await getPhotos(
        categoryQueries[category] ||
          `women ${category} fashion`
      );

      if (photoPools[category].length === 0) {
        throw new Error(
          `No photos found for category: ${category}`
        );
      }

      console.log(
        `${category}: ${photoPools[category].length} photos found`
      );
    }

    const photoIndex = {};

    for (const category of categories) {
      photoIndex[category] = 0;
    }

    const operations = products.map((product) => {
      const photos = photoPools[product.category];
      const index = photoIndex[product.category];

      if (index >= photos.length) {
        throw new Error(
          `Not enough photos for ${product.category}. Try running again later.`
        );
      }

      const photo = photos[index];
      photoIndex[product.category]++;

      const photographerUrl = new URL(
        photo.user.links.html
      );

      photographerUrl.searchParams.set(
        "utm_source",
        "glow_and_grace"
      );
      photographerUrl.searchParams.set(
        "utm_medium",
        "referral"
      );

      return {
        updateOne: {
          filter: { name: product.name },
          update: {
            $set: {
              ...product,
              image: photo.urls.small,
              imageCredit: `Photo by ${photo.user.name} on Unsplash`,
              imagePhotographerUrl: photographerUrl.toString(),
            },
          },
          upsert: true,
        },
      };
    });

    const result = await Product.bulkWrite(operations);

    console.log("Product seeding completed!");
    console.log(`Products processed: ${products.length}`);
    console.log(`New products inserted: ${result.upsertedCount}`);
    console.log(`Existing products updated: ${result.modifiedCount}`);
    console.log("Online image URLs saved to MongoDB!");
  } catch (error) {
    console.error("Product seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedProducts();
