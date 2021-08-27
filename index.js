function submitData(event) {
  event.preventDefault();
  populateFoods();
  let nama = document.getElementById("name").value;
  let usia = document.getElementById("age").value;
  let tinggiBadan = document.getElementById("height").value;
  let beratBadan = document.getElementById("weight").value;
  let genderElement = document.getElementsByName("gender");
  let gender = "";
  if (!Number(tinggiBadan) || !Number(beratBadan) || !Number(usia)) {
    return alert("Masukkan usia, tinggi atau berat badan dengan NUMBER");
    // break
  }
  for (let i = 0; i < genderElement.length; i++) {
    if (genderElement[i].checked) {
      gender = genderElement[i].value;
    }
  }
  let result = 0;
  if (gender === "male") {
    result =
      (66.47 + 13.75 * beratBadan + (5.0 * tinggiBadan - 6.75 * usia)) * 1.3;
  } else if (gender === "female") {
    result =
      (665.09 + 9.56 * beratBadan + (1.84 * tinggiBadan - 4.67 * usia)) * 1.3;
  }
  let kalori = Math.round(result);
  let output = {
    nama,
    usia,
    tinggiBadan,
    beratBadan,
    gender,
    kalori,
  };

  let decision = makeDecisionWeight(output);
  //   console.log(throwData(decision));
  return throwData(decision);
}

function throwData(data) {
  // code here

  let calculate = document.getElementById("result");
  calculate.classList.add("d-block");
  let pResult = document.getElementById("result");
  let tambahKurang = data.tambahKurang;
  let tambahan = "";
  let content = `Halo ${data.nama}, <span class="text-dark">berat anda ${data.beratBadan} kg</span>. Anda termasuk dalam kategori <span class="text-dark">${data.bodycategory}<span>.`;
  if (tambahKurang == 0) {
    content += ` Jumlah kalori yang anda butuhkan setiap hari sebanyak <span class="text-dark">${data.kalori} kcal</span>.`;
  } else if (tambahKurang < 0) {
    tambahan = "Kurangi";
    content += ` <span class="text-dark">${tambahan}<span> berat badan anda sebanyak <span class="text-dark">${(
      data.beratBadan -
      22.9 * (((data.tinggiBadan / 100) * data.tinggiBadan) / 100)
    ).toFixed(
      1
    )} kg</span> untuk mencapai berat ideal. Untuk mengurangi <span class="text-dark">0,5 kg tiap minggu</span>, kalori yang anda butuhkan setiap hari sejumlah <span class="text-dark">${
      data.kalori - 1000
    } kcal</span>.`;
  } else if (tambahKurang > 0) {
    tambahan = "Tingkatkan";
    content += ` <span class="text-dark">${tambahan}</span> berat badan anda sebanyak <span class="text-dark">${(
      18.5 * (((data.tinggiBadan / 100) * data.tinggiBadan) / 100) -
      data.beratBadan
    ).toFixed(
      1
    )} kg</span> untuk mencapai berat ideal. Untuk menambah <span class="text-dark">0,5 kg tiap minggu</span>, kalori yang anda butuhkan setiap hari sejumlah <span class="text-dark">${
      data.kalori + 1000
    } kcal</span>.`;
  }
  content += `<br>
  <button
  type="reset"
  style="
    background-color: rgb(41, 119, 102);
    color: white;
    border: 1px solid #97cb9a;
    font-family: 'Ubuntu', sans-serif;
  "
  class="btn mybutton"
  onclick="backToCalculate()"
>
  Calculate
</button>`;
  pResult.innerHTML += content;
  // let calculate = document.getElementById("calculateForm");
  // calculate.classList.add("d-none");
}

function calculateIndexMass(data) {
  let height = data.tinggiBadan / 100;
  let weight = data.beratBadan;

  let imt = Number((weight / (height * height)).toFixed(1));
  let bodyCategory = "";

  if (imt < 18.5) {
    bodyCategory = "Underweight";
  } else if (imt >= 18.5 && imt <= 22.9) {
    bodyCategory = "Normal";
  } else if (imt >= 23 && imt <= 27.5) {
    bodyCategory = "Overweight";
  } else {
    bodyCategory = "Obesitas";
  }

  return {
    beratBadan: data.beratBadan,
    imt: imt,
    bodyCategory: bodyCategory,
  };
}

function makeDecisionWeight(data) {
  const minIdealMass = 18.5;
  const maxIdealMass = 22.9;
  const height = data.tinggiBadan / 100;
  const indexMass = calculateIndexMass(data);
  let addMinus;

  if (indexMass.imt < minIdealMass) {
    addMinus = minIdealMass - indexMass.imt;
  } else if (indexMass.imt > maxIdealMass) {
    addMinus = maxIdealMass - indexMass.imt;
  } else {
    addMinus = 0;
  }
  let addMinusDecision = Number((addMinus * (height * height)).toFixed(1));
  if (addMinus === 0) {
    addMinusDecision = 0;
  }
  data.bodycategory = indexMass.bodyCategory;
  data.imt = indexMass.imt;
  data.tambahKurang = Number(addMinus.toFixed(1));
  return data;
  // return Number(addMinus.toFixed(1))
}
function clearData(event) {
  // event.preventDefault();
  let foodDiv = document.getElementById("myresult");
  foodDiv.innerHTML = "";
}
function deleteClass() {
  let genderElement = document.getElementsByName("gender");
  let gender = "";
  for (let i = 0; i < genderElement.length; i++) {
    if (genderElement[i].checked) {
      gender = genderElement[i].value;
    }
  }

  if (gender === "male") {
    var element = document.getElementById("malee");
    element.classList.remove("d-none");
  } else if (gender === "female") {
    var element2 = document.getElementById("femalee");
    element2.classList.remove("d-none");
  }
}

function backToCalculate(event) {
  let cresult = document.getElementById("myresult");
  cresult.innerHTML = "";
  let calculate = document.getElementById("calculateForm");
  calculate.classList.add("d-flex");
}

function populateFoods() {
  let Foods = [
    {
      name: "Spaghetti Squash with Roasted Tomatoes, Beans & Almond Pesto",
      calories: 260,
      description: "balebalebale",
      url: "https://www.eatingwell.com/recipe/256507/spaghetti-squash-with-roasted-tomatoes-beans-almond-pesto/",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F08%2F26231111%2F4293522.jpg&w=426&h=285&c=sc&poi=face&q=85",
    },
    {
      name: "Creamy Garlic Pasta with Shrimp & Vegetables",
      calories: 361,
      description: "balebalebale",
      url: "https://www.eatingwell.com/recipe/250069/creamy-garlic-pasta-with-shrimp-vegetables/",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F08%2F26230659%2F3837239.jpg&w=426&h=285&c=sc&poi=face&q=85",
    },
    {
      name: "Cheesy Spinach-&-Artichoke Stuffed Spaghetti Squash",
      calories: 223,
      description: "balebalebale",
      url: "https://www.eatingwell.com/recipe/269783/cheesy-spinach-artichoke-stuffed-spaghetti-squash/",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F08%2F26231107%2F6149762.jpg&w=426&h=285&c=sc&poi=face&q=85",
    },
  ];
  let foodDiv = document.getElementById("myresult");
  foodDiv.innerHTML += `
  <div
        id="mycontent"
        class="d-flex justify-content-center align-items-center"
      >
      <img src="m1.png" class="d-none" id="malee" />
      <p id="result"></p>
      <img src="f1.png" class="d-none" id="femalee" />
      </div>
     
      <div class="row mt-5 mx-2 g-4" id="makanan">

</div>
  `;
  let makanan = document.getElementById("makanan");
  makanan.innerHTML += "<h3 class='d-flex justify-content-center'>Your Diet Menu</h3>"
  for (const value of Foods) {
    makanan.innerHTML += `
    <div class="col-4 mt-2">
    <div class="card">
      <img src="${value.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${value.name}</h5>
        <p class="card-text">${value.calories} cKal</p>
        <a class="btn btn-dark" target="_blank" href="${value.url}">cek resep</a>
      </div>
    </div>
  </div>`;
  }

  // var element = document.getElementById("calculateForm");
  // element.classList.add("d-none");
  // console.log(food.name, ">>");
  // console.log(food.image, ">>");

  deleteClass();
}
