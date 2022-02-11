import React from 'react'

function About() {
  return (
    <div className="flex flex-col justify-center mb-4">
      <h1
        className="my-10 mx-auto text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-3d glitch"
        data-text="Ultrasoft.uz"
      >
        Ultrasoft.uz
      </h1>
      <p className="mb-4 text-center text-xl lg:text-2xl font-light">
        Kompyuter uchun dasturlar, o'yinlar va operatsion tizimlar joylanuvchi
        sayt. Ushbu sayt rasmiy{' '}
        <strong>
          <a
            href="https://t.me/UltraSoft_uz"
            className="link link-hover"
            target="_blank"
            rel="noreferrer"
          >
            UltraSoft.uz
          </a>
        </strong>{' '}
        telegram kanalining bir qismi sifatida faoliyat olib boradi.
      </p>
      <p className="text-center text-lg text-gray-400 mb-4">
        Versiya: <br /> <span className="text-base-content">2.0.0</span>
      </p>
      <p className="text-center text-lg text-gray-400 mb-4">
        Sayt egasi:
        <br />
        <a
          className="link link-hover  text-base-content"
          href="https://t.me/I_shakhzod"
          target="_blank"
          rel="noreferrer"
        >
          Shahzod
        </a>
      </p>
      <p className="text-center text-lg text-gray-400 mb-4">
        Tuzuvchi:
        <br />
        <a
          className="text-base-content link link-hover"
          href="https://t.me/buyerdayangiusernamebulishikkedi"
          target="_blank"
          rel="noreferrer"
        >
          Fazliddin Pardayev
        </a>
      </p>
    </div>
  )
}

export default About
