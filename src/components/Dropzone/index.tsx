import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'

import './styles.css';

interface Props {
    onFileUpLoaded: (file: File) => void; //void que não tem retorno
}

const Dropzone: React.FC<Props> = ({onFileUpLoaded}) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUpLoaded(file);
  }, [onFileUpLoaded])

  const {getRootProps, getInputProps} = useDropzone({
      onDrop,
      accept: 'image/*'
  })

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      { selectedFileUrl
        ? <img src={selectedFileUrl} alt='Point thumbnail' />
        : (
            <p>
                <FiUpload />
                Imagem do estabelecimento
            </p>
        )
      }

    </div>
  )
}

export default Dropzone;