import React, { useEffect, useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import swopHeader from "./assets/website-header.png";
import { idlFactory } from "./interfaces/backend";
import { Footer } from "./components/Footer";

function App() {

  // Asset Canister ID: 63em7-5iaaa-aaaap-qbm7q-cai

  const basicAgent = new HttpAgent({ host: "https://ic0.app" });
  const backendActor = Actor.createActor(idlFactory, {
    agent: basicAgent,
    canisterId: "35nwh-5qaaa-aaaap-qbhtq-cai"
  });

  const getOwner = async() => {
    const owner = await backendActor.seeOwner();
    console.log(Principal.from(owner).toText());
  }

  const generateEntriesList = async() => {
    const entriesList = await backendActor.getAllPosts() as post[];
    console.log(entriesList);
    await populateBody(entriesList);
  }

  type post = {
    id: number,
    content: string,
    media: string,
    link: string
  }

  const populateBody = async(entriesList: post[]) => {
    const body = document.getElementById("body");
    entriesList.forEach((entry) => {
      const post = document.createElement("div");
      post.className = "post";
      post.onclick = () => {  window.open(entry.link, "_blank"); }; 
      const content = document.createElement("p");
      content.innerHTML = entry.content;
      const photo = document.createElement("img");
      photo.src = entry.media;
      photo.className = "postPhoto";
      post.appendChild(content);
      post.appendChild(photo);
      body?.appendChild(post);
    });
  }

  useEffect(() => {
    console.log(backendActor);
    getOwner();
    generateEntriesList();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <img src={swopHeader} className="App-logo" alt="logo" />
      </div>

      <div className="body" id="body">

      </div>

      <Footer />
    </div>
  )
}
export default App;