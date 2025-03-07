import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import Product from "../product/product.model.js"

const __dirname = dirname(fileURLToPath(import.meta.url));

export const generateInvoicePdf = async (req, res, next) => {
    try {
        const { usuario, billId } = req;

        const products = await Promise.all(
            usuario.cart.map(async item => {
                const product = await Product.findById(item.pid);
                return {
                    name: product.name,
                    quantity: item.quantity,
                    price: product.price
                };
            })
        );

        const invoiceData = {
            id: billId._id,
            clientName: `${usuario.name} ${usuario.surname}`,
            date: new Date().toLocaleDateString(),
            products: products,
            total: usuario.cartTotal
        };

        console.log(invoiceData);

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 12;

        page.drawText('Factura', { x: 50, y: 350, size: 24, font });

        page.drawText(`Factura ID: ${invoiceData.id}`, { x: 50, y: 330, size: fontSize });
        page.drawText(`Cliente: ${invoiceData.clientName}`, { x: 50, y: 310, size: fontSize });
        page.drawText(`Fecha: ${invoiceData.date}`, { x: 50, y: 290, size: fontSize });

        page.drawText('Productos:', { x: 50, y: 260, size: fontSize });

        let y = 240;
        invoiceData.products.forEach(product => {
            page.drawText(`${product.name} - ${product.quantity}    Q${product.price}`, { x: 50, y, size: fontSize });
            y -= 20;
        });

        page.drawText(`Total: Q${invoiceData.total}`, { x: 50, y: y - 20, size: fontSize, color: rgb(0, 0.5, 0) });

        const pdfBytes = await pdfDoc.save();

        const pdfPath = join(__dirname, `../../public/docs/factura-${invoiceData.id}.pdf`);
        await fs.writeFile(pdfPath, pdfBytes);

        return res.status(200).json({
            success: true,
            message: "Factura generada",
            path: pdfPath
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al generar factura",
            error: err.message
        });
    }
}

