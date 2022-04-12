import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Collapse, Radio } from 'antd';
import { AccordionItemPanel } from 'react-accessible-accordion';
import Container from 'common/src/components/UI/Container';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const AccordionContainer = ({}) => {
  return (
    <Container>
      <Collapse onChange={callback}>
        <Panel header="Select ethnicity" key="1">
          <Radio.Group value={5}>
            <Radio value={'latino'}>latino</Radio>
            <Radio value={'non-latino'}>non-latino</Radio>
          </Radio.Group>
        </Panel>
        <Panel header="Select gender" key="2">
          <Radio.Group value={5}>
            <Radio value={'male'}>Male</Radio>
            <Radio value={'female'}>Female</Radio>
          </Radio.Group>
        </Panel>
        <Panel header="Select race" key="3">
          <Radio.Group value={5}>
            <Radio value={'americanIndianOrAlaskanNative'}>
              American Indian or Alaskan Native
            </Radio>
            <Radio value={'asian'}>Asian</Radio>
            <Radio value={'blackOrAfricanAmerican'}>
              Black or African American
            </Radio>
            <Radio value={'nativeHawaiianOrOtherPacificIslander'}>
              Native Hawaiian or Other Pacific Islander
            </Radio>
            <Radio value={'white'}>White</Radio>
          </Radio.Group>
        </Panel>
      </Collapse>
    </Container>
  );
};

export default AccordionContainer;
