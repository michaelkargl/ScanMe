import {TabMenuTabs} from "../tab-menu/tab-menu-ui";
import {Layout} from "../../layout";
import React, {useEffect} from "react";
import encodeQR from "qr";
import {MarkdownFile} from "../shared/models/markdown-file";

export interface CreatorUiProps {
    markdownFiles: MarkdownFile[]
}

export const CreatorUi: React.FC<CreatorUiProps> = (props) => {
    const [qrContent, setQrContent] = React.useState<string>("");
    const [qrCode, setQrCode] = React.useState<string>('');

    useEffect(() => {
        const qrCode = encodeQR(qrContent, 'svg');
        setQrCode(qrCode);
    }, [qrContent]);

    return (<div className="creator-ui-component">
        <Layout selectedTab={TabMenuTabs.Creator}>
            <fieldset>
                <div className='field-row-stacked'>
                    <label htmlFor='qr-content'>QR Content</label>

                    <pre>
                        {JSON.stringify(props.markdownFiles, null, 2)}
                    </pre>

                    <textarea id='qr-content' rows={8} onChange={(e) => setQrContent(e.target.value)}>
                        {qrContent}
                    </textarea>

                    <select onChange={(e) => setQrContent(e.target.value)}>
                        {props.markdownFiles.map(f => (
                            <option key={f.id} value={f.fileName}>
                                {f.title}
                        </option>))}
                    </select>

                    <div className='qr-code-container'>
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode!)}`}/>
                    </div>
                </div>
            </fieldset>
        </Layout></div>)
}
