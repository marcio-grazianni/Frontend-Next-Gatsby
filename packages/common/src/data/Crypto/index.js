import AuthorOne from '../../assets/image/crypto/author-4.jpg';
import AuthorTwo from '../../assets/image/crypto/author-2.jpg';
import AuthorThree from '../../assets/image/crypto/author-3.jpg';
import AuthorFour from '../../assets/image/crypto/author-1.jpg';
import FEATURE1 from '../../assets/image/crypto/tf1.svg';
import FEATURE2 from '../../assets/image/crypto/tf2.svg';
import FEATURE3 from '../../assets/image/crypto/tf3.svg';
import FEATURE4 from '../../assets/image/crypto/tf4.svg';
import PROOF1 from '../../assets/image/crypto/proof1.svg';
import PROOF2 from '../../assets/image/crypto/proof2.svg';
import PROOF3 from '../../assets/image/crypto/proof3.svg';
import PROOF4 from '../../assets/image/crypto/proof4.svg';
import PROOF5 from '../../assets/image/crypto/proof5.svg';
import PROOF6 from '../../assets/image/crypto/proof6.svg';
import JACKPOTIMG from '../../assets/image/crypto/jackpot.svg';
import BETA1 from '../../assets/image/crypto/beta-1.svg';
import BETA2 from '../../assets/image/crypto/beta-2.svg';
import BETA3 from '../../assets/image/crypto/beta-3.svg';

export const MENU_ITEMS = [
  {
    label: 'Home',
    path: '#banner_section',
    offset: '0',
  },
  {
    label: 'About us',
    path: '#trusted',
    offset: '0',
  },
  {
    label: 'Offers',
    path: '#scalable',
    offset: '-10',
  },

  {
    label: 'Payment Proofs',
    path: '#featureslider',
    offset: '-10',
  },
  {
    label: 'Contact Us',
    path: '#footerSection',
    offset: '380',
  },
];

export const TESTIMONIALS = [
  {
    review:
      "I needed money for some home improvements.  I thought it would take weeks.  It took days.  I'm thoroughly impressed",
    name: 'Jon Doe',
    designation: 'CEO of Dell Co.',
    avatar: `${AuthorOne}`,
  },
  {
    review:
      "I was approved the same day and had the signings done within a couple days.  I didn't know that was possible",
    name: 'Jon Doe',
    designation: 'Co Founder of IBM',
    avatar: `${AuthorTwo}`,
  },
  {
    review:
      'I have bought more than 10 themes on crypto, and this is the first one I review.',
    name: 'Jeny Doe',
    designation: 'Manager of Hp co.',
    avatar: `${AuthorThree}`,
  },
  {
    review:
      "I was approved in five minutes and had the signings done within 20 minutes.  I didn't think it was possible",
    name: 'Jon Doe',
    designation: 'Manager of Hp co.',
    avatar: `${AuthorFour}`,
  },
];
export const TRANSACTIONS_FEATURE = [
  {
    image: FEATURE1,
    title: 'Fill out the one page application',
    des: 'Provide your payout wallet address and callback URL to PayBear API.',
  },
  {
    image: FEATURE2,
    title: 'Ask for Payment',
    des: 'Show your customer the wallet address as well as the payment amount.',
  },
  {
    image: FEATURE3,
    title: 'Get Paid',
    des: 'Payment is sent to the payout wallet immediately.',
  },
  {
    image: FEATURE4,
    title: 'Get Payment Notification.',
    des:
      'Callbacks are sent to the URL you specified. You can process customer order',
  },
];
export const PROOFS_FEATURE = [
  {
    image: PROOF1,
    title: 'Instant trading',
    des: 'Never miss a price swing.',
  },
  {
    image: PROOF2,
    title: 'No hidden fees',
    des: 'know our fees upfront.',
  },
  {
    image: PROOF3,
    title: 'Secure storage',
    des: 'Sleep with peace of mind.',
  },
  {
    image: PROOF4,
    title: 'Systematic trading',
    des: 'History intraday market.',
  },
  {
    image: PROOF5,
    title: 'Network Effect',
    des: 'Casinos contribute 1%.',
  },
  {
    image: PROOF6,
    title: 'Bigger Rewards',
    des: 'Players are incentivized.',
  },
];
export const SCALABLE_FEATURE = [
  {
    image: JACKPOTIMG,
    title: 'Daily Jackpot',
    des: '35000 CLV',
  },
  {
    image: JACKPOTIMG,
    title: 'Weekly Jackpot',
    des: '250000 CLV',
  },
  {
    image: JACKPOTIMG,
    title: 'Monthly Jackpot',
    des: '4999697 CLV',
  },
  {
    image: JACKPOTIMG,
    title: 'Yearly Jackpot',
    des: '300245785000 CLV',
  },
];

export const BETA_FEATURE = [
  {
    image: BETA1,
    title: 'SEPA Transfers',
    des: 'Deposit & Withdraw money.',
  },
  {
    image: BETA2,
    title: '24/7 Support',
    des: 'Always here for you.',
  },
  {
    image: BETA3,
    title: 'Secure',
    des: 'Your money is safe.',
  },
];

export const menuWidget = [
  {
    id: 1,
    title: 'Contact Us',
    menuItems: [
      {
        id: 1,
        url: '#',
        text: 'improveloans@gmail.com',
      },
      {
        id: 2,
        url: '#',
        text: '731-676-5855',
      },
      {
        id: 3,
        url: '#',
        text: 'FAQ',
      },
      {
        id: 4,
        url: '#',
        text: 'Learn',
      },
      {
        id: 5,
        url: '#',
        text: 'Glossary',
      },
    ],
  },
  {
    id: 2,
    title: 'Company',
    menuItems: [
      {
        id: 1,
        url: '#',
        text: 'About us',
      },
      {
        id: 2,
        url: '#',
        text: 'Media',
      },
      {
        id: 3,
        url: '#',
        text: 'Careers',
      },
      {
        id: 4,
        url: '#',
        text: '',
      },
      {
        id: 5,
        url: '#',
        text: '',
      },
    ],
  },
  {
    id: 3,
    title: 'Legal',
    menuItems: [
      {
        id: 1,
        url: '#',
        text: 'Privacy Policy',
      },
      {
        id: 2,
        url: '#',
        text: 'Terms of Use',
      },
      {
        id: 3,
        url: '#',
        text: 'Disclosures and Licensing',
      },
      {
        id: 4,
        url: '#',
        text: '',
      },
      {
        id: 5,
        url: '#',
        text: '',
      },
    ],
  },
];
export const Language_NAMES = [
  {
    label: 'English',
    value: 'eng',
  },
  {
    label: 'Chinese',
    value: 'chinese',
  },
  {
    label: 'Indian',
    value: 'indian',
  },
];
export const Source_of_INCOME = [
  {
    label: 'English',
    value: 'eng',
  },
  {
    label: 'Chinese',
    value: 'chinese',
  },
  {
    label: 'Indian',
    value: 'indian',
  },
];


/* ------------------------------------ */
// Pricing policy data section
/* ------------------------------------ */
export const pricing = {
  slogan: 'DASHBOARD',
  title: 'Dashboard',
  monthly: [
    {
      id: 1,
      title: 'Home Equity Line of Credit',
      description: 'Loan Number',
      suggested: false,
      price: 0,
      features: [
        {
          id: 1,
          text: 'Address',
        },
        {
          id: 2,
          text: "Term",
        },
        {
          id: 3,
          text: 'APR',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
  
      {
      id: 2,
      title: 'Pro Master',
      description: 'For Best opportunities',
      suggested: true,
      price: 99,
      trail: 14,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    }, 
  ],
  annualy: [
    {
      id: 1,
      title: 'Pro Master',
      description: 'For Small teams or office',
      suggested: true,
      price: 999,
      trail: 14,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
    
    {
      id: 2,
      title: 'Enterprise',
      description: 'For Best opportunities',
      suggested: false,
      price: 1299,
      trail: 30,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },   
  ],
};

