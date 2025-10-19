import Bio from "./components/bio"
import Alltime from "./components/all"
import Radar from "./components/radar"
import Club from "./components/alltimeclub"
import Outsaudhi from "./components/clubwithoutsaudhy"
import Copa from "./components/copaeuro"
import Inter from "./components/international"
import League from "./components/league"
import Tropy from "./components/Achievment"
import Footer from "./components/footer";
import Art from "./components/artical"
import Head from "./components/head"
import After from "./components/after30"

export default function Home() {
  return (
    <div className=" w-full max-w-5xl p-4 mx-auto">
      <Head/>
      <Bio/>
      <Radar/>       
      <Alltime/>
      <Club/>
      <Outsaudhi/>
       <Copa/>
       <Inter/>
       <League/>
       <Tropy/>
       <Art/>
       <Footer/>
    </div>
  );
}
