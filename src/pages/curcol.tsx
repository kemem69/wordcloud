import axios from "axios";
import Image from "next/image";
import * as React from "react";
import { useState } from 'react';
import logoCurcol from '../../public/assets/curcol/logoCurcol.png';

interface IFormParagonProps { }

const FormParagon: React.FunctionComponent<IFormParagonProps> = (props) => {
  const [kata, setKata] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const postData = {
        kata,
      };

      const postResponse = await axios.post("https://konseruntuk.online/api/data1", postData, {
        headers: { "Content-Type": "application/json" },
      });

      if (postResponse.status === 201) {
        setBerhasil(true)
        setKata("")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="containerFormParagon">
        <div className="containerInputFormParagon">
          <Image className="imageNovo" src={logoCurcol} alt="logoNovo"></Image>
          <form className="formParagon" onSubmit={handleSubmit}>
            {/* <h1>Whats is the best version of you?</h1> */}

            <div className="inputWrapper">
              <input
                type="text"
                required
                value={kata}
                placeholder="Silahkan curcol..."
                onChange={(e) => setKata(e.target.value)}
                maxLength={40} />

              {/* <p>You can submit more than one response.</p> */}
              {berhasil ? (<p>Terima kasih!</p>) : null}
              <button className="submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormParagon;
