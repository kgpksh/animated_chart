import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

export default function TableViewSample() {
    const labels = ['Legend', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const pizza = ['Pizza', 30, 25, 75, 95, 13, 55, 30, 26, 80, 32, 16, 48]
    const Hamburger = ['Hamburger', 65, 59, 80, 81, 56, 30, 40, 38, 27, 68, 35, 55]
    let labelsIndex = 0
    let pizzaIndex = 0
    let hamburgerIndex = 0
    return (
        <div>
            <Table>
                <TableBody>
                    <TableRow key={0}>
                        {labels.map((cell) => (
                            <TableCell key={labelsIndex++}>{cell}</TableCell>
                        ))}
                    </TableRow>

                    <TableRow key={1}>
                        {pizza.map((cell) => (
                            <TableCell key={pizzaIndex++}>{cell}</TableCell>
                        ))}
                    </TableRow>

                    <TableRow key={2}>
                        {Hamburger.map((cell) => (
                            <TableCell key={hamburgerIndex++}>{cell}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}