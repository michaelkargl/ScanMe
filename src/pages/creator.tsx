import React, {useEffect} from "react";
import {ReactElement} from "react";
import {Layout} from "../layout";
import encodeQR from 'qr';

const CreatorPage: React.FC = (): ReactElement => {
    const [qrContent, setQrContent] = React.useState<string>("");
    const [qrCode, setQrCode] = React.useState<string>("");

    useEffect(() => {
        const qrCode = encodeQR(qrContent, 'ascii');
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
                    <p>
                        {qrCode}
                    </p>
                </div>
            </fieldset>
        </Layout>
    </div>)
}

export default CreatorPage;