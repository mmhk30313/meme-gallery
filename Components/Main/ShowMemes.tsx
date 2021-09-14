import React from 'react';
import { Image, message, Popconfirm } from "antd";
const ShowMemes = ({handleCancel, handleDelete, images}: any) => {
    function confirm(state?: any) {
        handleDelete(state?._id);
    }
    return (
        <div className="row p-3 justify-content-center">
            <Image.PreviewGroup>
                {
                  images?.map((picture: any, index: number) => {
                    return (
                        <div key={index} className={`rounded ${((index + 1) % 7 == 1 || (index + 1) % 7 == 0) ? "col-md-8" : "col-md-4"} col-sm-12`}>
                            <div className="card rounded my-2">
                                <Image
                                    className={`w-100 rounded`}
                                    // width={200}
                                    height={280}
                                    src={picture.imageUrl}
                                    // preview={true}
                                />
                                <p className="bg-light p-2 m-0 text-dark text-center">{picture?.title}</p>
                                <Popconfirm
                                    title={`Are you sure to delete this folder?`}
                                    onConfirm={() => confirm(picture)}
                                    onCancel={handleCancel}
                                    okText="Yes"
                                    cancelText="No"
                                    
                                    className="border border-none btn btn-outline-danger"
                                >
                                    Delete
                                </Popconfirm>
                            </div>
                      </div>
                    );
                  })}
              </Image.PreviewGroup>
            {/* {
                images?.map((image: any, index: number) => {
                    return <div className={`${((index + 1) % 7 == 1 || (index + 1) % 7 == 0) ? "col-md-8" : "col-md-4"} col-sm-12`}>
                        
                    </div>
                })
            } */}
        </div>
    );
};

export default ShowMemes;