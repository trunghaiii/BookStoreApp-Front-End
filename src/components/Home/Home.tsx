
import './Home.scss';

import { AiOutlineReload } from 'react-icons/Ai';

import { Col, Row, Checkbox, Divider, InputNumber, Button } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const Home = () => {

    const plainOptions = ['Arts', 'Business', 'Teen', 'Cooking', "Entertainment",
        "History", "Music", "Sports", "Travelling"];
    const onChange = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
    };
    return (
        <div className="homepage-container">
            <Row style={{ height: "100%" }} gutter={[20, 20]}>
                <Col md={4} sm={0} xs={0}>
                    <div className="homepage-leftside">
                        <div className='header'>
                            <div style={{ fontWeight: "600" }}>Search Filter</div>
                            <div style={{ fontSize: "20px", cursor: "pointer" }}><AiOutlineReload /></div>
                        </div>
                        <div className='checkbox-filter'>
                            <p style={{ fontWeight: "600" }}>Genre List</p>
                            <Checkbox.Group
                                style={{ display: "flex", flexDirection: "column", gap: "5px", marginLeft: "5px" }}
                                options={plainOptions}
                                defaultValue={['Apple']}
                                onChange={onChange}
                            />
                        </div>
                        <Divider />
                        <div className='range-filter'>
                            <p style={{ fontWeight: "600" }}>Price Range</p>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <InputNumber min={1} max={100000} /> - <InputNumber min={1} max={100000} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                <Button type='primary'>Apply</Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={20} sm={24} xs={24}>
                    <div className="homepage-rightside">
                        homepage-rightside
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default Home