import Image from 'next/image'
import {InfiniteSlider} from '@/components/motion-primitives/infinite-slider'

export default function ClientsSlider() {
  return (
    <>
      <InfiniteSlider gap={80} reverse>
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
        <Image
          src="/client-logos/apple-logo.png"
          alt="Apple Music logo"
          width={47}
          height={58}
          className="h-[47px] w-auto"
        />
      </InfiniteSlider>
    </>
  )
}
