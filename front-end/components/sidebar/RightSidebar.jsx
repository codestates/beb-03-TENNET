import Image from 'next/image';
import Link from 'next/link';

const style = {
  wrapper: `w-[24rem] text-lg text-[#b0b3b8]`,
  title: `text-[#afb3b8] font-semibold`,
  adsContainer: ``,
  ad: `flex items-center my-3 mr-[1rem] p-2 rounded-lg cursor-pointer`,
  adImageContainer: `min-w-[30%] mr-[0.5rem] `,
  adImage: `object-contain`,
  adText: 'text-[#b0b3b8]',
  adCompany: `text-sm `,
  divider: `w-[95%] border-b border-[0.5px] border-[#b0b3b8] my-2`,
};

export default function RightSidebar() {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Sponsored</div>
      <div className={style.adsContainer}>
        <Link
          href={
            'https://www.coupang.com/vp/products/324286997?itemId=1038296605&vendorItemId=5493710543&pickType=COU_PICK&q=%EC%82%AC%EA%B3%BC&itemsCount=36&searchId=ec18732f82794a0a88839dc3fefb62ee&rank=1&isAddedCart='
          }
        >
          <a target='_blank'>
            <div className={style.ad}>
              <div className={style.adImageContainer}>
                <Image
                  className={style.adImage}
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1724px-Apple_logo_grey.svg.png'
                  }
                  height={80}
                  width={100}
                  alt='apple logo'
                />
              </div>
              <div className={style.adText}>
                <div>Think Different</div>
                <div className={style.adCompany}>Apple</div>
              </div>
            </div>
          </a>
        </Link>
        <Link
          href={
            'https://www.coupang.com/vp/products/26983620?itemId=104266561&vendorItemId=3199214248&pickType=COU_PICK&q=doge&itemsCount=36&searchId=b26478d790604949b981293bae770c7d&rank=1&isAddedCart='
          }
        >
          <a target='_blank'>
            <div className={style.ad}>
              <div className={style.adImageContainer}>
                <Image
                  className={style.adImage}
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1587px-Tesla_Motors.svg.png'
                  }
                  height={80}
                  width={100}
                  alt='tesla logo'
                />
              </div>
              <div className={style.adText}>
                <div>Changing perception</div>
                <div className={style.adCompany}>Microsoft</div>
              </div>
            </div>
          </a>
        </Link>
        <Link
          href={
            'https://www.coupang.com/vp/products/2987336?itemId=257752910&vendorItemId=3626807515&q=microsoft&itemsCount=36&searchId=137f6af288854b9b810ca4000c726f45&rank=24&isAddedCart='
          }
        >
          <a target='_blank'>
            <div className={style.ad}>
              <div className={style.adImageContainer}>
                <Image
                  className={style.adImage}
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png'
                  }
                  height={80}
                  width={100}
                  alt='microsoft logo'
                />
              </div>
              <div className={style.adText}>
                <div>Be what's next</div>
                <div className={style.adCompany}>Tesla</div>
              </div>
            </div>
          </a>
        </Link>
        <Link
          href={
            'https://www.coupang.com/vp/products/6326736518?itemId=13212780016&vendorItemId=3659764661&q=amazon&itemsCount=36&searchId=1cede5cd90df43088ccb659b74fc5108&rank=9&isAddedCart='
          }
        >
          <a target='_blank'>
            <div className={style.ad}>
              <div className={style.adImageContainer}>
                <Image
                  className={style.adImage}
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/2560px-Amazon.com-Logo.svg.png'
                  }
                  height={80}
                  width={100}
                  alt='amazon logo'
                />
              </div>
              <div className={style.adText}>
                <div>Work Hard. Have Fun. Make History</div>
                <div className={style.adCompany}>Amazon.com</div>
              </div>
            </div>
          </a>
        </Link>
        <div className={style.divider} />
      </div>
    </div>
  );
}
