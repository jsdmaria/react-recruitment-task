interface PokemonDataTableItem {
	name: string;
	value: string | number;
}

const PokemonDataTable = ({ data }: { data: PokemonDataTableItem[] }) => (
	<table className="w-full md:w-[200px]">
		<tbody>
			{data.map((item) => (
				<tr key={item.name}>
					<th className="font-normal text-left">{item.name}:</th>
					<td className="text-right">{item.value}</td>
				</tr>
			))}
		</tbody>
	</table>
);

export default PokemonDataTable;
