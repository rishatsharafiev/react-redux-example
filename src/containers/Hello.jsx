import React from 'react';
import PropTypes from 'prop-types';
import 'element-theme-default/lib/index';
import { i18n, Layout, Button, Icon, Progress, Select } from 'element-react';
import locale from 'element-react/src/locale/lang/ru-RU';

i18n.use(locale);

const Hello = ({ name, surname, progress }) => {
  let status = '';
  let progressCode = progress;
  if (progress >= 0 || progress < 100) {
    status = '';
  } else if (progress === 100) {
    status = 'success';
  } else {
    status = 'exception';
  }

  if (progress < 0) {
    progressCode = 0;
    status = 'exception';
  }

  if (progress > 100) {
    progressCode = 100;
    status = 'exception';
  }

  return (
    <div>
      <Layout.Row gutter='10'>
        <Layout.Col span='3'>
          <Button type='primary'><Icon name='circle-check' /> {name}</Button>
        </Layout.Col>
        <Layout.Col span='3'>
          <Button type='primary'><Icon name='circle-close' /> {surname}</Button>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <Layout.Col>
          <Progress percentage={progressCode} status={status} />
          <Select>
            <Select.Option label='21' value='123' />
          </Select>
        </Layout.Col>
      </Layout.Row>
    </div>
  );
};

Hello.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  progress: PropTypes.number,
};

Hello.defaultProps = {
  name: 'John',
  surname: 'Connor',
  progress: 0,
};

export default Hello;
