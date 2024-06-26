import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Loader from './Loader';

interface AlbumProps {
  id: number;
  name: string;
  artists: {
    name: string;
  }[];
  images: {
    url: string;
  }[];
}

const Album = () => {
  const [albumsData, setAlbumsData] = useState<AlbumProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const fetchAlbums = async () => {
      if (accessToken) {
        try {
          setLoading(true)
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };

          const res = await axios.get(
            `https://api.spotify.com/v1/browse/new-releases?limit=15`,
            config
          );
          setAlbumsData(res.data.albums.items);
        } catch (err) {
          console.log(err);
        } finally {
          setTimeout(() => {
            setLoading(false)
          }, 2000);
        }
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div>
      <h1 className="title">Latest Albums</h1>
      {loading ? <Loader />:
      <div className='container'>
        {albumsData.map((album, index) => (
          <Card album={album} key={index} />
        ))}
      </div>
      }
    </div>
  );
};


export default Album;
