import React from "react";

let name = "Josh";

//Getting a random image from picsum, setting the width/height to 300, and requesting grayscale
let randomImage = "https://picsum.photos/300?grayscale";

function Home() {
  return (
    <div className="home">
      <h1>The Pillars of Living - By {name}</h1>
      <ul>
        <li>Eat</li>
        <li>Sleep</li>
        <li>Code</li>
      </ul>
      <br />
      <hr />
      <h1
        contentEditable="true"
        suppressContentEditableWarning="true"
        spellCheck="false"
      >
        {`There's something under the chicken coop. poop.`}
      </h1>
      <img
        alt=""
        src="https://www-assets.youneedabudget.com/wp-content/uploads/illo_blog_011719.jpg"
      ></img>
      <img
        alt=""
        src="https://www.vpr.org/sites/vpr/files/styles/medium/public/201803/kid-sleeping-illustration-victor-brave-istock_0.png"
      ></img>
      <img
        alt=""
        src="https://image.freepik.com/free-vector/cartoon-geek-code_10308-205.jpg"
      ></img>
      <br />
      <img alt="" src={randomImage}></img>
    </div>
  );
}

export default Home;
