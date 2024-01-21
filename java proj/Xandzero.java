// import javax.swing.JOptionPane;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Xandzero extends JFrame implements ActionListener {

	JFrame frame = new JFrame();
	JPanel panel = new JPanel();
    JButton[] xando = new JButton[9];
    JButton reset;
	boolean play1;
	int count = 0;
	int i, n = 0;
	String p1;
	String p2;
	boolean bool = true;




	Xandzero() {

		frame.setSize(500, 500);
		frame.setLayout(new BorderLayout());
		frame.setVisible(true);
		frame.add(panel);
		frame.setResizable(false);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		panel.setLayout(new GridLayout(3, 3));
		panel.setBackground(Color.black);

		for (i = 0; i <=8; i++) {

			xando[i] = new JButton();
			panel.add(xando[i]);
			xando[i].setBackground(Color.pink);
			xando[i].setFont(new Font("MV boli", Font.BOLD,80));
			xando[i].setFocusable(false);
			xando[i].addActionListener(this);
		}
		
		

	}

	@Override
	public void actionPerformed(ActionEvent e) {

			for (i = 0; i <=8; i++) {
				if (e.getSource() == xando[i]) {
					if (play1) {
						if (xando[i].getText() == "") {
							xando[i].setForeground(Color.white);
							xando[i].setText("X");
							play1 = false;
							
							checkbutton();
						}
					} else {
						if (xando[i].getText() == "") {

							xando[i].setForeground(Color.darkGray);
							xando[i].setText("O");
							play1 = true;
							
							checkbutton();
						}
					}
					count++;
					
				}
			}
            if (count == 9) {
                Tie();
            }
	
	

	}

	

	public void checkbutton() {
		
		if ((xando[0].getText() == "X") && 
            (xando[1].getText() == "X") && 
            (xando[2].getText() == "X")) {
			Xwon(0, 1, 2);
		}
		if ((xando[3].getText() == "X") && 
            (xando[4].getText() == "X") && 
            (xando[5].getText() == "X")) {
			Xwon(3, 4, 5);
		}
		if ((xando[6].getText() == "X") && 
            (xando[7].getText() == "X") && 
            (xando[8].getText() == "X")) {
			Xwon(6, 7, 8);
		}
		if ((xando[0].getText() == "X") && 
            (xando[3].getText() == "X") && 
            (xando[6].getText() == "X")) {
			Xwon(0, 3, 6);
		}
		if ((xando[1].getText() == "X") && 
            (xando[4].getText() == "X") && 
            (xando[7].getText() == "X")) {
			Xwon(1, 4, 7);
		}
		if ((xando[2].getText() == "X") && 
            (xando[5].getText() == "X") && 
            (xando[8].getText() == "X")) {
			Xwon(2, 5, 8);
		}
		if ((xando[0].getText() == "X") && 
            (xando[4].getText() == "X") && 
            (xando[8].getText() == "X")) {
			Xwon(0, 4, 8);
		}
		if ((xando[2].getText() == "X") && 
            (xando[4].getText() == "X") && 
            (xando[6].getText() == "X")) {
			Xwon(2, 4, 6);
		}
	
		if ((xando[0].getText() == "O") && 
            (xando[1].getText() == "O") && 
            (xando[2].getText() == "O")) {
			Owon(0, 1, 2);
		}
		if ((xando[3].getText() == "O") && 
            (xando[4].getText() == "O") && 
            (xando[5].getText() == "O")) {
			Owon(3, 4, 5);
		}
		if ((xando[6].getText() == "O") && 
            (xando[7].getText() == "O") && 
            (xando[8].getText() == "O")) {
			Owon(6, 7, 8);
		}
		if ((xando[0].getText() == "O") && 
            (xando[3].getText() == "O") && 
            (xando[6].getText() == "O")) {
			Owon(0, 3, 6);
		}
		if ((xando[1].getText() == "O") && 
            (xando[4].getText() == "O") && 
            (xando[7].getText() == "O")) {
			Owon(1, 4, 7);
		}
		if ((xando[2].getText() == "O") && 
            (xando[5].getText() == "O") && 
            (xando[8].getText() == "O")) {
			Owon(2, 5, 8);
		}
		if ((xando[0].getText() == "O") && 
            (xando[4].getText() == "O") && 
            (xando[8].getText() == "O")) {
			Owon(0, 4, 8);
		}
		if ((xando[2].getText() == "O") && 
            (xando[4].getText() == "O") && 
            (xando[6].getText() == "O")) {
			Owon(2, 4, 6);
		}

	}



	public void Tie() {

		if (bool) {
			for (i = 0; i < 9; i++) {
				xando[i].setEnabled(false);
			}
			
			JOptionPane.showMessageDialog(Xandzero.this, " TIE ");
		}

	}


	public void Xwon(int x, int y, int z) {

		xando[x].setBackground(Color.green);
		xando[y].setBackground(Color.green);
		xando[z].setBackground(Color.green);

		for (i = 0; i <=8; i++) {
			xando[i].setEnabled(false);
		}
        JOptionPane.showMessageDialog(Xandzero.this," X WON ");
		
		bool = false;
	}

	public void Owon(int a, int b, int c) {
		xando[a].setBackground(Color.green);
		xando[b].setBackground(Color.green);
		xando[c].setBackground(Color.green);

		for (i = 0; i < 9; i++) {

			xando[i].setEnabled(false);
		}
        JOptionPane.showMessageDialog(Xandzero.this," O WON ");
	
		bool = false;
	}




}

	
