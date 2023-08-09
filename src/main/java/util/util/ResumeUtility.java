package util.util;
import java.io.File;
;

public class ResumeUtility {

	public static boolean deleteResume(String prefix, String username) {
		// Replace "filePath" with the actual path of the file you want to delete
		String filename = username + ".pdf";
		File fileToDelete = new File(prefix, filename);

		if (fileToDelete.exists()) {
			if (fileToDelete.delete()) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
