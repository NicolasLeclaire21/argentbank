import iconChat from '../../components/featureItem/icon-chat.png'
import iconMoney from '../../components/featureItem/icon-money.png'
import iconSecurity from '../../components/featureItem/icon-security.png'
import './home.css'
import Banner from '../../components/banner';
import FeatureItem from '../../components/featureItem';

function Home() {

  const featureTitleChat = 'You are our #1 priority'
  const featureTitleMoney = 'More savings means higher rates'
  const featureTitleSecurity = 'Security you can trust'



  const featureTextChat =
    'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
  const featureTextMoney =
    'The more you save with us, the higher your interest rate will be!'
  const featureTextSecurity =
    'We use top of the line encryption to make sure your data and money is always safe.'



  return (
    <div className="home">
        <main>
            <Banner />
            <section className='features'>
                <FeatureItem 
                iconUrl={iconChat}
                title={featureTitleChat}
                text={featureTextChat}
                />
                <FeatureItem
                iconUrl={iconMoney}
                title={featureTitleMoney}
                text={featureTextMoney}
                />
                <FeatureItem
                iconUrl={iconSecurity}
                title={featureTitleSecurity}
                text={featureTextSecurity}
                 />
            </section>
        </main>
    </div>
  );
}

export default Home;