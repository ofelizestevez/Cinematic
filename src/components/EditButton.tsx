import EditIcon from "../assets/EditIcon";
import { useEditingContent } from "../context/EditingContentContext";
import { ThemeVariables } from "../utilities/Theme";
import Button from "./basic/Button";

function EditButton() {
	const { isEditingContent, setIsEditingContent } = useEditingContent();

	const handleClick = () => {
		setIsEditingContent(!isEditingContent);
	};

	return (
		<Button onClick={handleClick}>
			<EditIcon color={`var(${ThemeVariables.contentFgColor})`}></EditIcon>
		</Button>
	);
}

export default EditButton;
