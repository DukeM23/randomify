import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";

export default function FourOhFour() {
  return (
    <div className="container mx-auto flex flex-col justify-between h-screen sm:min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center gap-y-5 text-emerald-500">
        <h1 className="text-5xl">404</h1>
        <h1>Unexpected error.</h1>
        <h3>I guess you got abit too random.</h3>
      </div>
      <Footer />
    </div>
  );
}
