import React, {useEffect, useRef} from "react";
import {ReactElement} from "react";
import {Layout} from "../layout";
import encodeQR from 'qr';
import './creator.scss';


const CreatorPage: React.FC = (): ReactElement => {
    const [qrContent, setQrContent] = React.useState<string>("");
    const [qrCode, setQrCode] = React.useState<string>('');
    const svgContainerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const qrCode = encodeQR(qrContent, 'svg');
        setQrCode(qrCode);

    }, [qrContent]);

    return (<div className='creator-page-component'>
        <Layout>
            <fieldset>
                <div className='field-row-stacked'>
                    <label htmlFor='qr-content'>QR Content</label>
                    <textarea id='qr-content' rows={8} onChange={(e) => setQrContent(e.target.value)}>
                        {qrContent}
                    </textarea>

                    <div className='qr-code-container'>
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode!)}`}/>
                    </div>
                </div>
            </fieldset>
        </Layout>
    </div>)
}

export default CreatorPage;