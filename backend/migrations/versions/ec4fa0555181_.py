"""empty message

Revision ID: ec4fa0555181
Revises: 59c1126bf626
Create Date: 2023-12-06 20:35:47.205283

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ec4fa0555181'
down_revision = '59c1126bf626'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('framework', schema=None) as batch_op:
        batch_op.add_column(sa.Column('año', sa.Integer(), nullable=True))

    with op.batch_alter_table('hobby', schema=None) as batch_op:
        batch_op.add_column(sa.Column('summary', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hobby', schema=None) as batch_op:
        batch_op.drop_column('summary')

    with op.batch_alter_table('framework', schema=None) as batch_op:
        batch_op.drop_column('año')

    # ### end Alembic commands ###
