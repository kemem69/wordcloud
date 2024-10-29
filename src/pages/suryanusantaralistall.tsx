import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paragon } from '../type';
import { useRouter } from 'next/router';

interface IParagonListProps {
}

const ParagonList: React.FunctionComponent<IParagonListProps> = (props) => {
  const [data1, setData1] = useState<Paragon[]>([]);
  const [data2, setData2] = useState<Paragon[]>([]);
  // const [data3, setData3] = useState<Paragon[]>([]);
  const [isLoaded, setIsLoaded] = useState(Boolean);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`https://suryanation.online/api/data1?_sort=id&_order=desc`)
        .then((res) => setData1(res.data))
        .catch((err) => console.log(err));
      axios
        .get(`https://suryanation.online/api/data2?_sort=id&_order=desc`)
        .then((res) => setData2(res.data))
        .catch((err) => console.log(err));
      setIsLoaded(true);
      setInterval(() => {
        axios
          .get(`https://suryanation.online/api/data1?_sort=id&_order=desc`)
          .then((res) => setData1(res.data))
          .catch((err) => console.log(err));
        axios
          .get(`https://suryanation.online/api/data2?_sort=id&_order=desc`)
          .then((res) => setData2(res.data))
          .catch((err) => console.log(err));
      }, 10000);
    }
  }, []);

  const handleDeleteAll = () => {
    const deleteKataAll = window.confirm("Are you sure want to delete all?")

    if (deleteKataAll) {
      data1.forEach((data) => {
        axios
          .delete(`https://suryanation.online/api/data1/${data.id}`)
          .catch((err) => console.log(err))
      });
      alert("berhasil delete data");
    }
  }

  const handleDeleteAll2 = () => {
    const deleteKataAll = window.confirm("Are you sure want to delete all?")

    if (deleteKataAll) {
      data2.forEach((data) => {
        axios
          .delete(`https://suryanation.online/api/data2/${data.id}`)
          .catch((err) => console.log(err))
      });
      alert("berhasil delete data");
    }
  }

  const handleDelete = (id: any) => {
    const deleteKata = window.confirm("Are you sure want to delete?")

    if (deleteKata) {
      axios
        .delete(`https://suryanation.online/api/data1/${id}`)
        .catch((err) => console.log(err))
    };
  }

  const handleDelete2 = (id: any) => {
    const deleteKata = window.confirm("Are you sure want to delete?")

    if (deleteKata) {
      axios
        .delete(`https://suryanation.online/api/data2/${id}`)
        .catch((err) => console.log(err))
    };
  }

  return (
    <>
      <div className='container'>
        <h1>All List</h1>
        <div className='row'>
          <div className="list-holder">
            <h2>Nama Tongkrongan</h2>
            <h3>Total: 312</h3>
            <button onClick={() => handleDeleteAll()}>Delete All Data 1</button>
            {data1.map((data) => {
              return (
                <div className='data-item' key={String(data.id)}>
                  {data.kata}
                  <button style={{ float: "right" }} onClick={() => handleDelete(data.id)}>Delete</button>
                  <button style={{ float: "right" }} onClick={() => {
                    router.push({
                      pathname: "/curcoldetail",
                      query: { id: String(data.id) }
                    })
                  }}>Detail</button>
                </div>
              )
            })}
          </div>
          <div className="list-holder">
            <h2>Mimpi Terlupakan</h2>
            <h3>Total: 256</h3>
            <button onClick={() => handleDeleteAll2()}>Delete All Data 2</button>
            {data2.map((data) => {
              return (
                <div className='data-item' key={String(data.id)}>
                  {data.kata}
                  <button style={{ float: "right" }} onClick={() => handleDelete2(data.id)}>Delete</button>
                  <button style={{ float: "right" }} onClick={() => {
                    router.push({
                      pathname: "/curcoldetail",
                      query: { id: String(data.id) }
                    })
                  }}>Detail</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParagonList;