import React, { useRef, useState } from 'react';
import { Button, Form, Input, message, Image, Popconfirm } from "antd";
import FormItem from 'antd/lib/form/FormItem';
import request from '../../utils/request';
import ShowMemes from './ShowMemes';
// import ShowMemes from './ShowMemes';


const Main = (props: any) => {
    const {setMemes, memes} = props;
    const [form] = Form.useForm();
    const titleRef = useRef();
    const [imageUrl, setImageUrl] = useState<any>("");
    const [data, setData] = useState<any[]>(memes);

    const loadData = async() => {
        const result = await request('/get-all-memes');
        // console.log({result});
        // setMemes(result);
        setData(result);
    }


    // useEffect(()=> {loadData();}, [""]);

    // Submitting memo
    const handleFinish = async(evt?: any) => {
        // console.log({evt});
        const d: any = new Date();
        const memoObj = {
            title: evt?.title,
            imageUrl: imageUrl,
            createdAt: `${d.getDate()} ${d.toDateString().substr(4, 3)} ${d.getFullYear()}`
        }
        const hide =  message.loading("Logging", 60);
        hide();
        // console.log({memoObj});
        const result = await request('/add-memo',{
            method: 'POST',
            body: JSON.stringify(memoObj),
        });
        if(result?.message){
            message.error(result.message);
        }
        else{ 
            message.success("Your memo is created");
            setImageUrl("");
            form.resetFields();
            loadData();
        }
        // fetch("https://meme-server-gallery.herokuapp.com/add-memo", {
        //     method: "POST",
        //     body: JSON.stringify(memoObj),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // })
        // .then(res => res.json())
        // .then(data => {
        //     // console.log(data);
        //     if(data){
        //         message.success("Your memo is created");
        //         setImageUrl("");
        //         form.resetFields();
        //     }
        //     loadData();
        // })
        // .catch(err => console.log(err));
    }

    const setImage = (file: any) => {
        // console.log(file);
        const imgData = new FormData();
        imgData.set("key", "4ddc64c369e800157d688eb222ce91af");
        imgData.append('image', file);
        fetch("https://api.imgbb.com/1/upload", {
            method: 'POST',
            body: imgData,
            // If you add this, upload won't work
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data.data.display_url);
            const url = data.data.display_url;
            setImageUrl(url);
        })
        .catch(err => console.log(err))
        
    }
    // Image deletion ======= 
    function confirm(state?: any) {
        setImageUrl("");
    }
    
    // Image deletion cancelled =======
    function cancel(e: any) {
        message.error("You have cancelled to delete your image");
    }

    const handleEdit = (id: any) => {
        console.log({id});
    }

    const handleDelete = async (id: any) => {
        // console.log({id});
        const result = await request(`/delete/${id}`);
        // console.log({result});
        if(result?.deletedCount){
            loadData();
            message.success("Your image is deleted");
        }
    };

    return (
        <div style={{width: "fit-content", overflow: "hidden"}}>
            <Form
                style={{ marginTop: 8, width: "88%" }}
                form={form}
                id="myForm"
                name="form"
                onFinish={handleFinish}
                // initialValues={{}}
                layout="vertical"
                className="mx-auto"
            >

                <div className="row">
                    <div className="col-md-10 col-sm-12">
                        <FormItem
                            name="title"
                            id="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Meme title is required"
                                }
                            ]}
                        >
                            <div className="d-flex">
                                <Input id="title" type="text" className="" placeholder="Enter meme title" />
                                <Button style={{width: "fit-content"}} type="primary" form="myForm" key="submit" htmlType="submit">
                                    <div className="d-flex justify-content-between"><span className="mx-2">Add</span><span className="mr-2">Meme</span></div>
                                </Button>
                            </div>
                        </FormItem>
                    </div>
                    <div className="col-md-2 col-sm-12">
                        <label className="btn btn-warning w-100" htmlFor="image-upload">+ Upload</label><br />
                        <Input onChange={(evt: any) => setImage(evt.target.files[0])} id="image-upload" type="file" className="d-none" />
                        {
                            (imageUrl != "") && <div className="w-75 mx-auto card rounded p-1 my-2" style={{width: "105px"}}>
                                <Image 
                                    src={imageUrl}
                                    style={{cursor: "pointer"}}
                                    // width={100}
                                    height={90}
                                    preview={true}
                                    className={` rounded`} 
                                    // className={`${styles?.image} rounded`} 
                                    alt="N/A"
                                />
                                <Popconfirm
                                    title={`Are you sure to delete this icon?`}
                                    onConfirm={() => confirm("image")}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                    className="btn btn-outline-danger"
                                >
                                    Delete
                                </Popconfirm>
                            </div>
                        }
                    </div>
                </div>
            </Form>
            {
                data?.length > 0 && <ShowMemes handleCancel={cancel} handleDelete={handleDelete} images={data} />
            }
        </div>
    );
};

export default Main;