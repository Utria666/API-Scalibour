import imagenCarusel from "../assets/carusel1.webp";
import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.webp";
import img3 from "../assets/img3.webp";
import img4 from "../assets/img4.webp";
import img5 from "../assets/img5.webp";
import img6 from "../assets/img6.webp";

import Button from "../components/common/Button";
import {
  TextWithImgLeft,
  TextWithImgRight,
} from "../components/HomePage/ImgWithText";
import FeatureCard from "../components/HomePage/FeatureCard";


function HomePage() {
  return (
    <div key="1" className="bg-[#f7f7f7]">
      <div
        style={{ backgroundImage: `url(${imagenCarusel})` }}
        className="relative bg-cover bg-center h-screen"
      >
        <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center">
          <div className="text-white uppercase p-3.5 font-bold text-2xl">
            Scalibour
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <a className="text-white hover:text-gray-300" href="#">
              Inicio
            </a>
            <a className="text-white hover:text-gray-300" href="#">
              Reservas
            </a>
            <a className="text-white hover:text-gray-300" href="#">
              Galería
            </a>
            <a className="text-white hover:text-gray-300" href="#">
              Contacto
            </a>
            <Button
              texto="Iniciar sesión"
              className="bg-violet-800 hover:bg-violet-700 text-white"
              to="login"
            ></Button>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Exclusividad y Confort en SCALIBOUR
          </h1>
          <p className="mb-6">
            Experimente la modernidad y el lujo en cada estancia
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <TextWithImgLeft
          titleText="Descubra Nuestras Características Destacadas de Lujo"
          descriptionText="Experimente una estancia llena de lujos inigualables."
          descriptionColor="gray-600"
          buttonText="Ver habitaciones"
          buttonStyle="ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          imgSrc={img1}
          imgAlt="Hotel de lujo "
        />
      </div>
      <div className="bg-black py-12">
        <div className="container mx-auto px-4">
          <TextWithImgRight
            titleText="Gastronomía Exquisita Local"
            titleColor="white"
            descriptionText="Nuestro restaurante sirve sabores autóctonos y gastronomía exquisita."
            descriptionColor="white"
            buttonText="Ver menú"
            buttonStyle="ring-offset-background border bg-background hover:bg-accent hover:text-accent-foreground border-white text-white"
            imgSrc={img2}
            imgAlt="Gastronomía"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <TextWithImgLeft
          titleText="Servicios Exclusivos en Hotel"
          descriptionText="Ofrecemos una gama de servicios premium para engrandecer su estancia."
          descriptionColor="gray-600"
          buttonText="Ver servicios"
          buttonStyle="ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          imgSrc={img3}
          imgAlt="Servicios Exclusivos en Hotel"
        />
      </div>
      <div className="container mx-auto px-3">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Nuestros Servicios Premium Te Esperan
        </h2>
        <hr className="mb-8 border-gray-300" />
      </div>
      <div className="container  mx-auto px-4 mb-8">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Atención al cliente excepcional"
            subtitle="Asistencia Personalizada 24/7"
            description="Nuestro comprometido equipo de conserjes está disponible las 24 horas, los 7 días de la semana para atender cualquier consulta o necesidad que pueda tener."
            buttonText="Contactar"
            buttonStyle="bg-violet-800 hover:bg-violet-700 text-white"
          />
          <div className="bg-violet-700 text-white p-6">
          <FeatureCard
            title="Gestión de eventos personalizada"
            titleC="text-white"
            subtitle="Organización de Eventos Inolvidables"
            subtitleC="text-white"
            description="Nuestro equipo de profesionales experimentados se encargará de todos los detalles para hacer de su evento una experiencia memorable, sea una boda, conferencia o reunión familiar."
            descriptionC="text-white"
            buttonText="Reservar"
            buttonStyle="bg-white hover:bg-zinc-300 text-violet-700"
          />
          </div>
          <FeatureCard
            title="Apartamento privado de lujo"
            subtitle="Alojamiento Exclusivo de Lujo"
            description="Viva la auténtica experiencia de lujo con nuestros apartamentos privados, equipados con todas las comodidades premium para garantizar una estancia inolvidable."
            buttonText="Reservar Ahora"
            buttonStyle="bg-violet-800 hover:bg-violet-700 text-white"
          />
        </div>
      </div>
      <div className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-8">
              Lo Que Nuestros Huéspedes Dicen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <blockquote className="text-sm italic">
                <p>
                  La atención personalizada nos ha dejado muy satisfechos.
                  Absolutamente recomendable.
                </p>
                <footer className="mt-4">— Carlos S.</footer>
              </blockquote>
              <blockquote className="text-sm italic">
                <p>
                  Los servicios del spa son excepcionales. Hemos disfrutado
                  completamente.
                </p>
                <footer className="mt-4">— Laura P.</footer>
              </blockquote>
              <blockquote className="text-sm italic">
                <p>
                  La exquisitez de los platos del chef superaron nuestras
                  expectativas. Magnífico.
                </p>
                <footer className="mt-4">— María G.</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <img
            alt="Experiencia Inigualable de Lujo"
            className="w-full h-auto object-cover"
            height="200"
            src={img4}
            style={{
              aspectRatio: "365/200",
              objectFit: "cover",
            }}
            width="365"
          />
          <img
            alt="Diseño Contemporáneo y Confort"
            className="w-full h-auto object-cover"
            height="200"
            src={img5}
            style={{
              aspectRatio: "365/200",
              objectFit: "cover",
            }}
            width="365"
          />
          <img
            alt="Descubra Verdadero Confort Aquí"
            className="w-full h-auto object-cover"
            height="200"
            src={img6}
            style={{
              aspectRatio: "365/200",
              objectFit: "cover",
            }}
            width="365"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="bg-violet-700 text-white p-20 text-center">
          <h1 className="text-6xl font-bold mb-4">Inicia Tu Viaje de Lujo</h1>
          <p className="text-xl mb-8">
            Reserva con nosotros y vive una experiencia de lujo innegable.
          </p>
          <Button
            texto="Reservar"
            className="bg-white hover:bg-zinc-300 text-violet-700"
          />
        </div>
        <div className="bg-white p-10 text-gray-700">
          <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8">
            <div>
              <h2 className="font-bold text-lg mb-3">SCALIBOUR</h2>
              <p className="mb-2">Lujo Moderno, Confort Inigualable</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Hotel</h3>
              <a className="block mb-1" href="#">
                Sobre Nosotros
              </a>
              <a className="block mb-1" href="#">
                Contacto
              </a>
              <a className="block mb-1" href="#">
                Política de Privacidad
              </a>
              <a className="block" href="#">
                Términos de Servicio
              </a>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Reservas</h3>
              <a className="block mb-1" href="#">
                Reserva Ahora
              </a>
              <a className="block mb-1" href="#">
                Política de Cancelación
              </a>
              <a className="block mb-1" href="#">
                Editar Reservas
              </a>
              <a className="block" href="#">
                Consultar Reservas
              </a>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Explora</h3>
              <a className="block mb-1" href="#">
                Galería
              </a>
              <a className="block mb-1" href="#">
                Localización
              </a>
              <a className="block" href="#">
                Eventos
              </a>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Contacto</h3>
              <p className="mb-2">info@scalibour.com</p>
              <p className="mb-4">+34 912345678</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
          © 2023 SCALIBOUR, amamos a nuestros huéspedes!
        </div>
      </div>
    </div>
  );
}

export default HomePage;
