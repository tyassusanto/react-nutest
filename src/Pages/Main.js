import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Image, Modal, } from 'antd';
import { EditOutlined, DeleteOutlined, CameraOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom';
import Button from '../Components/Button'
import Input from '../Components/Input'
import axios from 'axios';
import noImg from '../../src/Images/noImage.jpg'

const Main = () => {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const querySearch = searchParams.get('name')
    const host = 'https://be-nutech-tech.vercel.app'

    useEffect(() => {
        if (querySearch) {
            axios.get(`${host}/product/get?name=${querySearch}`)
                .then((res) => {
                    setIsloading(false)
                    const result = res.data.data
                    setProducts(result)
                })
                .catch((err) => {
                    setIsloading(false)
                    console.log(err.reponse);
                })
        } else {
            setIsloading(true)
            axios.get(`${host}/product/get`)
                .then((res) => {
                    setIsloading(false)
                    const result = res.data.data
                    setProducts(result)
                    // console.log(result, 'ressss')
                })
                .catch((err) => {
                    setIsloading(false)
                    console.log(err.reponse);
                })
        }
    }, [querySearch])

    const handleSearch = (e) => {
        setTimeout(() => {
            setSearchParams({ name: e.target.value });
        }, 1000);
    };

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'buy_price' || name === 'sell_price' || name === 'qty') {
            const re = /^[0-9\b]+$/;
            if (value === '' || re.test(value)) {
                setForm({ ...form, [name]: value });
            }
        } else {
            setForm({ ...form, [name]: value });
        };
    };
    const [img, setImg] = useState()
    const [preview, setPreview] = useState(null);
    const handleChangeImg = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;

        setImg(value);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(value);

        setForm({
            ...form,
            [name]: value,
        });
    };

    const [form, setForm] = useState({
        product_name: '',
        buy_price: '',
        sell_price: '',
        qty: '',
        img: null
    });
    const handleOk = async (e) => {
        e.preventDefault()
        setLoading(true);
        axios
            .put(`${host}/product/update/${id}`, form)
            .then((res) => {
                setLoading(false);                    
                const result = res.data.data
                setProducts([result])
                // alert(`berhasil edit`);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 403) {
                    console.log(err);
                } else {
                    alert('error');
                }
            }, []);

        setIsModalOpen(false);
        setLoading(false);
    };
    const handleOkAddImg = async () => {
        try {
            const formData = new FormData();
            formData.append('img', form.img);
            const res = await axios.put(`${host}/product/addimage/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsModalAddImg(false);
            setLoading(false);
        } catch (error) {
            console.error('Upload error: ', error);
        }
    };

    const handleOkAdd = async (e) => {
        e.preventDefault()
        setLoading(true);
        axios
            .post(`${host}/product/add`, form)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 403) {
                    console.log(err);
                } else {
                    alert('error');
                }
            }, []);
        setIsModalAddOpen(false);
        setLoading(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const HandleCancelAddImg = () => {
        setIsModalAddImg(false);
    };
    const [editProduct, setEditProduct] = useState(null);
    const handleEdit = (product) => {
        setEditProduct(true);
        setForm(product);
        setId(product.id);
        setIsModalOpen(true);
    };
    const handleAddImg = (product) => {
        setEditProduct(true);
        setForm(product);
        setId(product.id);
        setIsModalAddImg(true);
    };

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalAddImg, setIsModalAddImg] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const handleDelete = (product) => {
        setId(product.id);
        setIsModalDeleteOpen(true);
    };
    const handleCancelDelete = () => {
        setIsModalDeleteOpen(false);
    };
    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
    };
    const [id, setId] = useState(null);



    const handleOkDelete = (e) => {
        e.preventDefault()
        setLoading(true);
        axios
            .delete(`${host}/product/delete/${id}`)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 403) {
                    console.log(err);
                } else {
                    alert('error');
                }
            });
        setIsModalDeleteOpen(false);
        setLoading(false);
    };

    return (
        <div>
            <Header />

            <div className="container py-3">

                <div className="search-receiver w-100">
                    <h5>Cari Barang</h5>
                    <Input
                        onKeyUp={handleSearch}
                        placeholder='Cari...' />
                </div>
                <div className="py-3 d-flex justify-content-end">
                    <Button className='btn btn-sm btn-primary' type="primary" onClick={setIsModalAddOpen}>
                        Tambah Item
                    </Button>
                </div>
                <table className="table">
                    <thead className=''>
                        <tr>
                            <th scope="col">Foto Produk</th>
                            <th scope="col">Nama Produk</th>
                            <th scope="col">Harga Beli</th>
                            <th scope="col">Harga Jual</th>
                            <th scope="col">Jumlah</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, id) => (
                            <tr key={id}>
                                <th><Image
                                    src={product.img ? product.img : noImg}
                                    width={50}
                                />
                                </th>
                                <th>{product.product_name}</th>
                                <th>Rp. {product.buy_price.toLocaleString('id-ID')}</th>
                                <th>Rp. {product.sell_price.toLocaleString('id-ID')}</th>
                                <th>{product.qty}</th>
                                <th>
                                    <EditOutlined className='pe-3' onClick={() => handleEdit(product)} />
                                    <CameraOutlined className='pe-3' onClick={() => handleAddImg(product)} />
                                    <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(product)}
                                    />
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                title="Hapus Produk?" open={isModalDeleteOpen} onOk={handleOkDelete} onCancel={handleCancelDelete}
            >
                Yakin ingin menghapus
            </Modal>
            <Modal
                title={`Tambahkan Gambar`} open={isModalAddImg} onOk={handleOkAddImg} onCancel={HandleCancelAddImg}
            >
                {preview && (
                    <img className='col-md-12'
                        src={preview}
                        alt="Preview"
                        style={{ maxWidth: '70px', maxHeight: '70px' }}
                    />
                )}
                <input type="file" accept="image/*" name="img" onChange={handleChangeImg} />
            </Modal>
            <Modal
                title="Edit Produk" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            >
                <div className="input-group input-group-sm mb-3 row">
                    <label className='pe-2 align-self-center col-md-3'>Nama Produk</label>
                    <input type="text" className="form-control"
                        name='product_name'
                        value={form.product_name}
                        onChange={handleChange}
                        placeholder='Masukan Nama Barang'
                    />
                </div>
                <div className="input-group input-group-sm mb-3 row">
                    <label className='pe-2 align-self-center col-md-3'>Harga Beli</label>
                    <input type="text" className="form-control"
                        name='buy_price'
                        value={form.buy_price}
                        onChange={handleChange}
                        placeholder='Masukan Harga Beli'
                    />
                </div>
                <div className="input-group input-group-sm mb-3 row">
                    <label className='pe-2 align-self-center col-md-3'>Harga Jual</label>
                    <input type="text" className="form-control"
                        name='sell_price'
                        value={form.sell_price}
                        onChange={handleChange}
                        placeholder='Masukan Harga Jual'
                    />
                </div>
                <div className="input-group input-group-sm mb-3 row">
                    <label className='pe-2 align-self-center col-md-3'>Jumlah</label>
                    <input type="text" className="form-control"
                        name='qty'
                        value={form.qty}
                        onChange={handleChange}
                        placeholder='Masukan Jumlah Barang'
                    />
                </div>
            </Modal>
            <Modal
                title="Tambah Prouk" open={isModalAddOpen} onOk={handleOkAdd} onCancel={handleCancelAdd}
            >
                <div className="input-group input-group-sm mb-3 row">
                    <label className='pe-2 align-self-center col-md-3'>Nama Produk</label>
                    <input type="text" className="form-control"
                        name='product_name'
                        onChange={handleChange}
                        placeholder='Masukan Nama Barang'
                    />
                </div>
                <div className="input-group input-group-sm mb-3 row">
                    <label className='pe-2 align-self-center col-md-3'>Harga Beli</label>
                    <input type="text" className="form-control"
                        name='buy_price'
                        onChange={handleChange}
                        placeholder='Masukan Harga Beli'
                    />
                </div>
                <div className="input-group input-group-sm mb-3 row">
                    <label className='pe-2 align-self-center col-md-3'>Harga Jual</label>
                    <input type="text" className="form-control"
                        name='sell_price'
                        onChange={handleChange}
                        placeholder='Masukan Harga Jual'
                    />
                </div>
                <div className="input-group input-group-sm mb-3 row">
                    <label className='pe-2 align-self-center col-md-3'>Jumlah</label>
                    <input type="text" className="form-control"
                        name='qty'
                        onChange={handleChange}
                        placeholder='Masukan Jumlah Barang'
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Main
