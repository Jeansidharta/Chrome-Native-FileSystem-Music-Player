import { NextPage, NextPageContext } from 'next';
import redirect from '../libs/next-redirect';

const Index: NextPage = () => {
	return <div />;
}

Index.getInitialProps = (context: NextPageContext) => {
	redirect(context, '/home');
	return {};
};

export default Index;