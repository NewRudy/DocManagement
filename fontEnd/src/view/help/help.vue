<template>
    <div>
        <el-button @click="add" type="primary"><i class="el-icon-plus"></i>新增</el-button>
        <el-table
                :data="tableData"
                v-loading="loading"
                border
                stripe
                style="width: 100%;margin-top: 10px;">
            <el-table-column prop="date" label="日期">
                <template v-slot="scope">
                    <el-date-picker v-if="scope.row.isEdit" v-model="scope.row.date" type="date"  placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <span v-else>{
   {scope.row.date}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名">
                <template v-slot="scope">
                    <el-input v-if="scope.row.isEdit" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                    <span v-else>{
   {scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址">
                <template v-slot="scope">
                    <el-input v-if="scope.row.isEdit" v-model="scope.row.address" placeholder="请输入内容"></el-input>
                    <span v-else>{
   {scope.row.address}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template v-slot="scope">
                    <el-button v-if="!scope.row.isEdit" @click="edit(scope.row)" type="text" size="mini">编辑</el-button>
                    <el-button type="text" size="small" v-if="scope.row.isEdit" @click="save(scope.row)">保存</el-button>
                    <el-button type="text" size="small" v-if="scope.row.isEdit" @click="cancel(scope.row, scope.$index)">取消</el-button>
                    <el-button v-if="!scope.row.isEdit" @click="handleDelete(scope.$index)" size="mini" type="text" style="color:red;">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    name: "TEMPLATE",
    data(){
      return{
        loading:false,
        tableData: [{
          date: '2020-12-31',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isEdit: false,
          isAdd: false
        }, {
          date: '2020-12-18',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          isEdit: false,
          isAdd: false
        }, {
          date: '2020-12-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          isEdit: false,
          isAdd: false
        }, {
          date: '2020-12-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          isEdit: false,
          isAdd: false
        }]
      }
    },
    methods:{
      add(){
        this.tableData.push({
          date: '',
          name: '',
          address:'',
          isEdit: true,
          isAdd: true
        });
      },
      edit(row) {
        row.isEdit = true;
        // 备份原始数据
        row['oldRow'] = JSON.parse(JSON.stringify(row));

      },
      save(row){
        row.isEdit = false;
        var that = this;
        that.loading = true;

        that.$message({
          type: 'success',
          message: '保存成功!'
        });
        setTimeout(function(){
          that.loading =false;
        },500);
      },
      // 取消
      cancel(row, index) {
        // 如果是新增的数据
        if (row.isAdd) {
          this.tableData.splice(index, 1)
        } else {
          // 不是新增的数据  还原数据
          for (const i in row.oldRow) {
            row[i] = row.oldRow[i];
          }
          row.isEdit = false;
        }
      },
      handleDelete(id){
        this.$confirm('确定要删除这条记录吗？', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          var that = this;
          that.tableData.splice(id, 1);
          that.loading = true;
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(function(){
            that.loading =false;
          },500);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },

    }
  }
</script>

<style scoped>

</style>