
import React, { useState } from 'react';
// import './index.css';
import { AiOutlineReload } from 'react-icons/ai';

import {
    Checkbox, Divider,
    InputNumber, Button, Drawer, Form
} from 'antd';

interface IProps {
    showFilterDrawer: boolean;
    setShowFilterDrawer: any;
    handleReload: any;
    onFinish: any;
    handleFilter: any;
    genreOptions: any;
}

const FilterDrawer = (props: IProps) => {

    const [form] = Form.useForm();

    const { showFilterDrawer, setShowFilterDrawer,
        handleReload, onFinish, handleFilter, genreOptions } = props;

    const onClose = () => {
        setShowFilterDrawer(false);
    };

    const handleReloadDrawer = () => {
        form.resetFields();
        handleReload()
    }

    const handleApply = () => {
        form.submit()
        setShowFilterDrawer(false)
    }

    return (
        <Drawer width={"90%"} title="Basic Drawer" placement="right" onClose={onClose} open={showFilterDrawer}>

            <div className="homepage-leftside">
                <div className='header'>
                    <div style={{ fontWeight: "600" }}>Search Filter</div>
                    <div
                        onClick={() => handleReloadDrawer()}
                        style={{ fontSize: "20px", cursor: "pointer" }}>
                        <AiOutlineReload />
                    </div>
                </div>
                <Form
                    form={form}
                    name="basic"
                    autoComplete="off"
                    onFinish={onFinish}
                    onValuesChange={(changedValues, allValues) => handleFilter(changedValues, allValues)}
                >

                    <div className='checkbox-filter'>
                        <p style={{ fontWeight: "600" }}>Genre List</p>
                        <Form.Item

                            name="checkboxFilter"
                        >
                            <Checkbox.Group
                                style={{ display: "flex", flexDirection: "column", gap: "5px", marginLeft: "5px" }}
                                options={genreOptions}
                            />
                        </Form.Item>
                    </div>
                    <Divider />
                    <div className='range-filter'>
                        <p style={{ fontWeight: "600" }}>Price Range</p>
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            <Form.Item

                                name="rangefrom"
                            ><InputNumber placeholder='from' min={1} max={100000} /></Form.Item>
                            <div>-</div>
                            <Form.Item

                                name="rangeto"
                            ><InputNumber placeholder='to' min={1} max={100000} /></Form.Item>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <Button onClick={() => handleApply()} type='primary'>Apply</Button>
                        </div>
                    </div>
                </Form>


            </div>

        </Drawer>
    )
}

export default FilterDrawer;